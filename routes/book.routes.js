const express = require("express")
const { BookModel } = require("../models/book.model")
const { UserModel } = require("../models/user.model")
const { authenticate } = require("../middleware/auth.middleware")


const bookRouter = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the book.
 *         author:
 *           type: string
 *           description: The author of the book.
 *         publishedYear:
 *           type: integer
 *           description: The year the book was published.
 *         ISBN:
 *           type: integer
 *           description: The ISBN of the book.
 *         quantity:
 *           type: integer
 *           description: The quantity of the book available.
 *         borrower:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: The ID of the user who borrowed the book.
 *               returnDate:
 *                 type: string
 *                 format: date
 *                 description: The return date of the book.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier of the user.
 *         name:
 *           type: string
 *           description: The name of the user.
 *         email:
 *           type: string
 *           description: The email address of the user.
 *         password:
 *           type: string
 *           description: The password of the user.
 *         borrower:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               book:
 *                 type: string
 *                 description: The ID of the book borrowed by the user.
 *               returnDate:
 *                 type: string
 *                 format: date
 *                 description: The return date of the book.
 */


/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API endpoints for managing books
 */


/**
 * @swagger
 * /book:
 *   get:
 *     summary: Get a list of books based on search criteria.
 *     description: Retrieve a list of books based on the provided query parameters.
 *     tags:
 *       - Books
 *     parameters:
 *       - name: title
 *         in: query
 *         type: string
 *         description: Filter books by title.
 *       - name: author
 *         in: query
 *         type: string
 *         description: Filter books by author.
 *       - name: publishedYear
 *         in: query
 *         type: integer
 *         description: Filter books by published year.
 *       - name: ISBN
 *         in: query
 *         type: integer
 *         description: Filter books by ISBN.
 *     responses:
 *       '200':
 *         description: Successfully retrieved a list of books matching the search criteria.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Book'
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: An error message indicating the issue.
 */

// Define the search route
bookRouter.get('/', async (req, res) => {

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


/**
 * @swagger
 * /book/search:
 *   get:
 *     summary: Search for books.
 *     description: Retrieve a list of books that match the provided query.
 *     tags:
 *       - Books
 *     parameters:
 *       - name: title
 *         in: query
 *         schema:
 *           type: string
 *         description: The title of the book to search for.
 *       - name: author
 *         in: query
 *         schema:
 *           type: string
 *         description: The author of the book to search for.
 *       - name: publishedYear
 *         in: query
 *         schema:
 *           type: integer
 *         description: The published year of the book to search for.
 *       - name: ISBN
 *         in: query
 *         schema:
 *           type: integer
 *         description: The ISBN of the book to search for.
 *       - name: quantity
 *         in: query
 *         schema:
 *           type: integer
 *         description: The quantity of the book to search for.
 *       - name: user
 *         in: query
 *         schema:
 *           type: string
 *         description: The user ID of the borrower to search for.
 *       - name: returnDate
 *         in: query
 *         schema:
 *           type: string
 *           format: date
 *         description: The return date of the book to search for.
 *     responses:
 *       '200':
 *         description: Successfully retrieved a list of books matching the query.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *               description: List of books matching the search criteria.
 *       '400':
 *         description: Bad request or validation error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: An error message.
 */


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


/**
 * @swagger
 * /book/{id}:
 *   get:
 *     summary: Get a particular available book by ID.
 *     description: Retrieve information about a specific available book by its ID.
 *     tags:
 *       - Books
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         description: The unique identifier of the book to retrieve.
 *     responses:
 *       '200':
 *         description: Successfully retrieved the book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       '404':
 *         description: Book not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: An error message indicating that the book was not found.
 *       '500':
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: An error message indicating an internal server error.
 */


// List porticular available books
bookRouter.get('/:id', async (req, res) => {
    try {
        const books = await BookModel.find({ _id: req.params.id });
        res.send(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


/**
 * @swagger
 * /book:
 *   post:
 *     summary: Add a new book.
 *     description: Add a new book to the library.
 *     tags:
 *       - Books
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Book object to be added.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the book.
 *               author:
 *                 type: string
 *                 description: The author of the book.
 *               publishedYear:
 *                 type: integer
 *                 description: The year the book was published.
 *               ISBN:
 *                 type: integer
 *                 description: The ISBN of the book (must be a 13-digit number).
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the book available.
 *             required:
 *               - title
 *               - author
 *               - publishedYear
 *               - ISBN
 *               - quantity
 *     responses:
 *       '201':
 *         description: Successfully added a new book.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message indicating that the book was added.
 *       '400':
 *         description: Bad request or validation error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: An error message indicating the issue.
 *       '401':
 *         description: Unauthorized - Authentication required.
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: An error message indicating the issue.
 */


// Add a new book
bookRouter.post('/', authenticate, async (req, res) => {
    try {
        const { title,author,publishedYear, ISBN ,quantity} = req.body;


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
        const book = new BookModel({title,author,publishedYear, ISBN ,quantity});
        await book.save();
        res.status(201).send({ "message": "Book saved successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


/**
 * @swagger
 * /book/{id}:
 *   put:
 *     summary: Update book details by ID.
 *     description: Update the details of a book identified by its ID.
 *     tags:
 *       - Books
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         description: The ID of the book to update.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The updated title of the book.
 *               ISBN:
 *                 type: integer
 *                 description: The updated ISBN of the book (must be a 13-digit number).
 *               author:
 *                 type: string
 *                 description: The updated author of the book.
 *               publishedYear:
 *                 type: integer
 *                 description: The updated published year of the book.
 *               quantity:
 *                 type: integer
 *                 description: The updated quantity of the book available.
 *     responses:
 *       '200':
 *         description: Successfully updated the book.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier of the updated book.
 *                 title:
 *                   type: string
 *                   description: The updated title of the book.
 *                 author:
 *                   type: string
 *                   description: The updated author of the book.
 *                 publishedYear:
 *                   type: integer
 *                   description: The updated published year of the book.
 *                 ISBN:
 *                   type: integer
 *                   description: The updated ISBN of the book.
 *                 quantity:
 *                   type: integer
 *                   description: The updated quantity of the book available.
 *       '400':
 *         description: Bad request or validation error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: An error message.
 *       '404':
 *         description: Book not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: An error message indicating that the book was not found.
 *       '401':
 *         description: Unauthorized - Authentication required.
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: An error message indicating the issue.
 */


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

/**
 * @swagger
 * /book/{id}:
 *   delete:
 *     summary: Delete a book by ID.
 *     description: Delete a book identified by its ID.
 *     tags:
 *       - Books
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         description: The ID of the book to delete.
 *     responses:
 *       '200':
 *         description: Successfully deleted the book.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating successful deletion.
 *       '404':
 *         description: Book not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: An error message indicating that the book was not found.
 *       '401':
 *         description: Unauthorized - Authentication required.
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: An error message indicating the issue.
 */

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


// Define the search and pagination route get route http://localhost:3000/book?page=1&perPage=10
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



/**
 * @swagger
 * /book/borrow/{id}:
 *   post:
 *     summary: Borrow a book by ID.
 *     description: Borrow a book identified by its ID.
 *     tags:
 *       - Books
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         description: The ID of the book to borrow.
 *     responses:
 *       '200':
 *         description: Successfully borrowed the book.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message indicating that the book was borrowed successfully.
 *       '400':
 *         description: Bad request or validation error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: An error message.
 *       '401':
 *         description: Unauthorized - Authentication required.
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: An error message indicating the issue.
 */


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

/**
 * @swagger
 * /book/return/{id}:
 *   post:
 *     summary: Return a borrowed book by ID.
 *     description: Return a book identified by its ID that has been previously borrowed.
 *     tags:
 *       - Books
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         description: The ID of the book to return.
 *     responses:
 *       '200':
 *         description: Successfully returned the book.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message indicating that the book was returned successfully.
 *       '400':
 *         description: Bad request or validation error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: An error message.
 *       '401':
 *         description: Unauthorized - Authentication required.
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: An error message indicating the issue.
 */


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