const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        borrower: [
            {
                book: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'book',
                },
                returnDate: {
                    type: Date,
                },
            }
        ]

    }
)

const UserModel = mongoose.model("user", userSchema)

module.exports = { UserModel }