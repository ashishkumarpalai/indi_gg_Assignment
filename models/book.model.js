
const mongoose = require("mongoose")


const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    publishedYear: {
        type: Number,
        required: true,
    },
    ISBN: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    borrower: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
        returnDate: {
            type: Date,
        }
    }],



});

const BookModel = mongoose.model("book", bookSchema)

module.exports = { BookModel }

