const express = require("express")
const { BookModel } = require("../models/book.model")
const { UserModel } = require("../models/user.model")
const { authenticate } = require("../middleware/auth.middleware")


const bookRouter = express.Router()

// Add a new book
bookRouter.post('/', authenticate, async (req, res) => {
    try {
        const { title, ISBN } = req.body;


        // Check if ISBN is a 13-digit number
        const isbnPattern = /^[0-9]{13}$/;

        if (!isbnPattern.test(ISBN)) {
            return res.status(400).send({ error: 'ISBN must be a 13-digit number' });
        }

        // Check if a book with the same title, author, and ISBN already exists
        const existingBook = await BookModel.findOne({ title });

        if (existingBook) {
            return res.status(400).send({ error: 'This book title already exists in the database' });
        }

        // Check if a book with the same ISBN already exists
        const existingISBN = await BookModel.findOne({ ISBN });

        if (existingISBN) {
            return res.status(400).send({ error: 'A book with the same ISBN already exists in the database' });
        }

        // If not, create a new book
        const book = new BookModel(req.body);
        await book.save();
        res.status(201).send({ "message": "Book saved successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update book details
bookRouter.put('/:id', authenticate, async (req, res) => {
    try {
        const { title, ISBN } = req.body;


        // Check if ISBN is a 13-digit number
        const isbnPattern = /^[0-9]{13}$/;

        if (!isbnPattern.test(ISBN)) {
            return res.status(400).send({ error: 'ISBN must be a 13-digit number' });
        }

        // Check if a book with the same title, author, and ISBN already exists
        const existingBook = await BookModel.findOne({ title });

        if (existingBook) {
            return res.status(400).send({ error: 'This book title already exists in the database' });
        }

        // Check if a book with the same ISBN already exists
        const existingISBN = await BookModel.findOne({ ISBN });

        if (existingISBN) {
            return res.status(400).send({ error: 'A book with the same ISBN already exists in the database' });
        }
        const book = await BookModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!book) {
            return res.status(404).send({ error: 'Book not found' });
        }

        res.status(200).send(book);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});


// Delete a book 
bookRouter.delete('/:id', authenticate, async (req, res) => {
    try {
        const book = await BookModel.findByIdAndDelete(req.params.id);
        if (!book) {
            // If the book with the specified ID is not found, return a 404 Not Found status.
            return res.status(404).send({ error: 'Book not found' });
        }
        res.send({ message: 'Book deleted' });
    } catch (error) {
        // If an error occurs during deletion, return a 500 Internal Server Error status.
        res.status(500).send({ error: error.message });
    }
});

// // List all available books
// bookRouter.get('/', async (req, res) => {
//     // console.log(req.user)
//     try {
//         const books = await BookModel.find();
//         res.send(books);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// Define the search and pagination route get route http://localhost:3000/book?page=1&perPage=1
bookRouter.get('/', async (req, res) => {
    try {
        const { page = 1, perPage = 10, ...query } = req.query;
        
        // Parse page and perPage to integers
        const pageNumber = parseInt(page, 10);
        const itemsPerPage = parseInt(perPage, 10);

        // Calculate the skip value
        const skip = (pageNumber - 1) * itemsPerPage;

        // Create a query object to use for filtering
        const filter = { ...query };

        // Your database query with search and pagination
        const books = await BookModel.find(filter)
            .skip(skip)
            .limit(itemsPerPage);

        const totalBooks = await BookModel.countDocuments(filter); // Get total count of matching books

        // Calculate total pages
        const totalPages = Math.ceil(totalBooks / itemsPerPage);

        res.json({
            books,
            totalPages,
            currentPage: pageNumber,
        });
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ error: 'An error occurred during the search.' });
    }
});



// Define the search route
bookRouter.get('/search', async (req, res) => {

    const query = req.query;

    try {
        // Use Mongoose to search for books that match the query
        const books = await BookModel.find(query);

        res.json(books);
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ error: 'An error occurred during the search.' });
    }
});


// List porticular available books
bookRouter.get('/:id', async (req, res) => {
    try {
        const books = await BookModel.find({ _id: req.params.id });
        res.send(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// Borrow a Book
bookRouter.post('/borrow/:id', authenticate, async (req, res) => {
    try {
        const book = await BookModel.findById(req.params.id);

        if (!book || book.quantity === 0) {
            return res.status(400).json({ error: 'Book not available for borrowing' });
        }

        const user = await UserModel.findById(req.user.userID);

        // Find books borrowed by the user
        const borrowedBooks = await BookModel.find({ 'borrower.user': req.user.userID });

        if (borrowedBooks.length >= 3) {
            return res.status(400).json({ error: 'You cannot borrow more than 3 books' });
        }

        // Check if the user has already borrowed the book
        const hasBorrowed = borrowedBooks.find(b => b._id.toString() === req.params.id);
        if (hasBorrowed) {
            return res.status(400).json({ error: 'You have already borrowed this book' });
        }

        // Decrease the book's quantity by 1
        book.quantity -= 1;

        // Set the borrower and return date
        book.borrower.push({ user: req.user.userID, returnDate: new Date() });

        // Add the book details to the user's borrower array
        user.borrower.push({ book: req.params.id, returnDate: new Date() });

        // Save both the updated book and user in the database
        await book.save();
        await user.save();

        res.json({ message: 'Book borrowed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// Return a Book
bookRouter.post('/return/:id', authenticate, async (req, res) => {
    try {
        const book = await BookModel.findById(req.params.id);

        if (!book || !book.borrower || book.borrower.length === 0) {
            return res.status(400).json({ error: 'Book not found or not borrowed' });
        }

        // Check if the book is borrowed by the current user
        const isBorrowedByUser = book.borrower.some(borrower => borrower.user.equals(req.user.userID));

        if (!isBorrowedByUser) {
            return res.status(400).json({ error: 'Book not borrowed by you' });
        }

        // Increment the book's quantity by 1
        book.quantity += 1;

        // Remove the borrower details for the current user
        book.borrower = book.borrower.filter(borrower => !borrower.user.equals(req.user.userID));

        // Save the updated book in the database
        await book.save();

        // Remove the book from the user's borrower details
        const user = await UserModel.findById(req.user.userID);
        user.borrower = user.borrower.filter(borrowedBook => !borrowedBook.book.equals(req.params.id));
        await user.save();

        res.json({ message: 'Book returned successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




module.exports = { bookRouter }