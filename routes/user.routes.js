const express = require("express")
const { UserModel } = require("../models/user.model")
const {BookModel}=require("../models/book.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userRouter = express.Router()


userRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body
    try {
        const user = await UserModel.find({ email })
        console.log(user)
        if (user.length > 0) {
            res.status(201).send({ "msg": "user already exist" })
        } else {
            bcrypt.hash(password, 5, async function (err, hash) {
                if (err) {
                    res.send({ "msg": "Something went wrong" })
                } else {
                    const user = new UserModel({ name, email, password: hash })
                    await user.save()
                    res.status(201).send({ "msg": "new User has been register" })
                }
            })
        }
    } catch (error) {
        res.status(400).send({ "msg": "Something went wrong", "error": error.message })
    }
})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await UserModel.find({ email })
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, function (err, result) {
                if (result) {
                    let token = jwt.sign({ userID: user[0]._id }, "masai", { expiresIn: "1h" })
                    res.status(201).send({ "msg": "Sucessfully Login ", "token": token, "user": user[0]._id })
                } else {
                    res.status(401).send({ "msg": "Wrong Password" })
                }
            })
        } else {
            res.status(401).send({ "msg": "Wrong Creadential" })
        }
    } catch (error) {
        res.status(500).send({ "msg": "Something Went wrong", "error": error.message })
    }
})

userRouter.get('/:id', async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id).populate('borrower');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = { userRouter }