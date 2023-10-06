// const swaggerJSDoc = require("swagger-jsdoc");

// // Swagger definition
// const swaggerDefinition = {
//   info: {
//     title: "managing books in a library.",
//     version: "3.0.0",
//     description: "API documentation for your application",
//   },
//   basePath: "/", // Base URL for your API
// };

// // Options for Swagger
// const options = {
//   swaggerDefinition,
//   apis: ["./routes/*.js"], // Path to the API routes
// };

// // Initialize swagger-jsdoc
// const swaggerSpec = swaggerJSDoc(options);

// module.exports = {swaggerSpec};


const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Library API',
      version: '1.0.0',
      description: 'API for managing books in a library',
    },
    servers: [
      {
        url: 'https://indi-gg-assignment.onrender.com/', // Update with your server URL
      },
    ],
  },
  apis: [path.join(__dirname, '../routes/*.js')], // Path to your route files
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {swaggerSpec};