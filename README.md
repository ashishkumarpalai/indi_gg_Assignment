# Book Management System API

## Overview

The Book Management System API is a RESTful API for managing books and user accounts. It allows users to register, log in, add, search, borrow, and return books.

## Deployed Link

```bash
   https://indi-gg-assignment.onrender.com
```

##  Swagger Documentation

```bash
 https://indi-gg-assignment.onrender.com/api-docs
```
## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [API Endpoints](#api-endpoints)
  - [User Registration](#user-registration)
  - [User Login](#user-login)
  - [Add a New Book](#add-a-new-book)
  - [Retrieve a List of Books](#retrieve-a-list-of-books)
  - [Borrow a Book](#borrow-a-book)
  - [Return a Borrowed Book](#return-a-borrowed-book)
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
