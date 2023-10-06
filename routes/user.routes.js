const express = require("express")
const { UserModel } = require("../models/user.model")
const {BookModel}=require("../models/book.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { authenticate } = require("../middleware/auth.middleware")

const userRouter = express.Router()
/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user.
 *     description: Register a new user with a name, email, and password.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 description: The password for the user.
 *     responses:
 *       '201':
 *         description: User registration successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A success message indicating that the user has been registered.
 *       '400':
 *         description: Bad request or validation error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: An error message indicating a bad request or validation error.
 *                 error:
 *                   type: string
 *                   description: An error message providing additional details about the error.
 */

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


/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: User login.
 *     description: Log in a user using their email and password.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 description: The password for the user.
 *     responses:
 *       '201':
 *         description: User login successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A success message indicating that the user has successfully logged in.
 *                 token:
 *                   type: string
 *                   description: A JWT (JSON Web Token) for user authentication.
 *                 user:
 *                   type: string
 *                   description: The ID of the logged-in user.
 *       '401':
 *         description: Unauthorized - Invalid credentials or wrong password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: An error message indicating unauthorized access or wrong password.
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: An error message indicating an internal server error.
 *                 error:
 *                   type: string
 *                   description: An error message providing additional details about the error.
 */

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

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get user details by ID.
 *     description: Retrieve user details by their unique identifier.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the user to retrieve.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved user details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier of the user.
 *                 name:
 *                   type: string
 *                   description: The name of the user.
 *                 email:
 *                   type: string
 *                   description: The email address of the user.
 *                 borrower:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       book:
 *                         type: string
 *                         description: The ID of the book borrowed by the user.
 *                       returnDate:
 *                         type: string
 *                         format: date
 *                         description: The return date of the book.
 *       '404':
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: An error message indicating that the user was not found.
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

userRouter.get('/:id',authenticate, async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id).populate('borrower');

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get a list of all users.
 *     description: Retrieve a list of all users with borrower details.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved the list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique identifier of the user.
 *                   name:
 *                     type: string
 *                     description: The name of the user.
 *                   email:
 *                     type: string
 *                     description: The email address of the user.
 *                   borrower:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         book:
 *                           type: string
 *                           description: The ID of the book borrowed by the user.
 *                         returnDate:
 *                           type: string
 *                           format: date
 *                           description: The return date of the book.
 *       '404':
 *         description: No users found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: An error message indicating that no users were found.
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

userRouter.get('/',authenticate, async (req, res) => {
    try {
        const user = await UserModel.find().populate('borrower');

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = { userRouter }