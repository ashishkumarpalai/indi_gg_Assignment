# Book Management System API

## Overview

The Book Management System API is a RESTful API for managing books and user accounts. It allows users to register, log in, add, search, borrow, and return books.

## Deployed Link

https://indi-gg-assignment.onrender.com

##  Swagger Documentation
https://indi-gg-assignment.onrender.com/api-docs

![Screenshot (714)](https://github.com/ashishkumarpalai/indi_gg_Assignment/assets/112760336/c7275f32-ecc5-4766-a787-3d821b1b6221)


## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Data Models](#data-models)
- [Contributing](#contributing)
- [License](#license)

## System Requirements
- Node.js: Ensure you have Node.js installed on your system. You can download it from nodejs.org.

- MongoDB: You should have MongoDB installed and running. You can download and install MongoDB from mongodb.com.
## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed
- MongoDB database running
- Your API authentication credentials (e.g., JWT secret)

### Installation

1. Clone this repository:

   ```shell
   git clone https://github.com/ashishkumarpalai/indi_gg_Assignment.git
   cd repository
   ```
   
2. Install the required dependencies:

  ```shell
      npm install
  ```

3. Create a .env file in the root directory and set the following environment variables:

  ```shell
      PORT=3000
      MONGODB_URI=Your mongodb url
      JWT_SECRET=your-secret-key
  ```
4. Start the server:

   ```shell
   npm run server
   ```

### API Endpoints
- Books
  
```GET /api/book: Retrieve a list of books with pagination and search.```

-- Parameters:

```shell
page (optional): Page number for pagination (default: 1).
perPage (optional): Number of items per page (default: 10).
title (optional): Filter books by title.
GET /api/book/:id: Retrieve a specific book by its ID.
```

```POST /api/book: Add a new book to the system.```

-- Request Body:

```shell
title (required): The title of the book.
author (required): The author of the book.
publishedYear (required): The year the book was published.
ISBN (required): The ISBN of the book (must be a 13-digit number).
quantity (required): The quantity of the book available.
```
``` PUT /api/book/:id: Update book details by its ID.```

-- Request Body:

```shell
title (required): The updated title of the book.
author (required): The updated author of the book.
publishedYear (required): The updated published year of the book.
ISBN (required): The updated ISBN of the book (must be a 13-digit number).
quantity (required): The updated quantity of the book available.

```

```DELETE /api/book/:id: Delete a book by its ID.```

- Users
- 
```POST /api/user/register: Register a new user.```

-- Request Body:

```shell
name (required): The name of the user.
email (required): The email address of the user.
password (required): The password of the user.
```

```POST /api/user/login: Log in as a user.```

-- Request Body:

```shell
email (required): The email address of the user.
password (required): The password of the user.
```

```GET /api/user/:id: Retrieve a specific user by their ID.```

```GET /api/user: Retrieve a list of all users.```

- Borrowing and Returning Books
  
```POST /api/book/borrow/:id: Borrow a book by its ID.```

```POST /api/book/return/:id: Return a borrowed book by its ID.```

## Design Choices

- Database: MongoDB was chosen as the database to store book and user data due to its flexibility and scalability.

- Authentication: JWT (JSON Web Tokens) are used for user authentication to secure API endpoints.

- Validation: Input data is validated to ensure data consistency and security. ISBNs are validated to be 13-digit numbers.

- Error Handling: The API provides meaningful error messages and status codes to aid in debugging and user feedback.

- Pagination: For large datasets, pagination is implemented to improve API performance.

- Populate: Mongoose's populate is used to retrieve related data, such as user borrowing information for books.

## Data Structures
- Book Model: The book model in the database includes fields for title, author, published year, ISBN, quantity, and borrower information (array of users and return dates).

- User Model: The user model includes fields for name, email, password (hashed), and an array of books they've borrowed.

## Algorithms
- Password Hashing: The bcrypt library is used to securely hash and store user passwords in the database.

- JWT Signing: JSON Web Tokens (JWT) are signed using a secret key to generate user authentication tokens.

- Pagination: Pagination logic is implemented using skip and limit in Mongoose queries to efficiently retrieve paginated data.
