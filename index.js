// Import required libraries and modules
const express = require("express")

require("dotenv").config()
const { connection } = require("./configs/db")
const{userRouter}=require("./routes/user.routes")
const{bookRouter}=require("./routes/book.routes")
const {authenticate}=require("./middleware/auth.middleware")
const{limiter}=require("./middleware/ratelimiter.middleware")
const{loggerMiddleware}=require("./middleware/logging.middleware")

// swagger
const swaggerUi = require("swagger-ui-express");
const {swaggerSpec} = require("./routes/swagger");



// Create an Express application
const app = express()

app.use(express.json())


// Apply the logger middleware to log requests
// app.use(loggerMiddleware);


// Serve Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Define a basic route for the root endpoint
app.get("/",limiter, async (req, res) => {
    res.send("wellcome to managing books in a library backend")
    console.log("Wellcome managing books in a library backend app")
})

// Use the userRouter for user registration and login
app.use("/user",limiter,userRouter)

app.use("/book",limiter,bookRouter)



// Start the server, listen to the specified port
app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("DataBase is connected")
    } catch (error) {
        console.log(error.message)
    }
    console.log(`server is running on port${process.env.port}`)
})