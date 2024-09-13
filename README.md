# Wellcome to The CMS API Project

This project is a Content Management System (CMS) API developed using Node.js, Typescript, Express.js, and MongoDB. The API is designed to handle content creation, management. It offers a variety of features for both administrators and content editors, including user authentication, media uploads, and content filtering.

- **important**: Please attention this project is **not yet ready for production** but you can uses this api for any front-end framework such as react, vue, angular. so, clone project and create own container based on front-end framework and all api ready for you 😉

## Table of Contents

- [Features](#Features)
- [Tech Stack](#Tech-Stack)
- [Installation](#Installation)
- [API Endpoints](#API-Endpoints)
- [Environment Variables](#Environment-Variables)
- [Coming Soon](#Coming-Soon)

## Features

### 1. User Authentication & Authorization

- Implements user authentication using JWT (JSON Web Tokens).
- Implements user authorization for user can access own articles.
- Role-based access control is integrated, allowing different user permissions (admin, user). for example just user admin can create categories

### 2. Content Creation & Management

- The API supports full CRUD operations (Create, Read, Update, Delete) for content such as:
  - Articles
  - Categories
  - Users
- Efficient handling of content relationships (e.g., posts associated with categories and user).

### 3. Media Upload & Management

- Allows upload, validation image file and management of media files.

### 4. RESTful API Design

- Follows RESTful architecture principles, making it easy to integrate with any front-end client or third-party services.
- Supports standard HTTP methods (GET, POST, PUT, DELETE) for handling requests.

### 5. MongoDB Integration

- The API uses MongoDB as the database for storing content, user data, and metadata.
- Utilizes Mongoose to define schemas, enforce validation, and interact with the database.

### 6. Data Validation

- The API uses Zod for full validation all incoming data from client

### 7. Search & Filtering & Pagination

- The API provides advanced search and filtering capabilities:
  - Search by keyword, title.
  - Filter by categories, publication date, createdAt, updatedAt.
  - Paginated results for large datasets.

### 8. API Documentation

- Comprehensive API documentation is provided using tools such as Swagger or Postman.
- Includes clear guidelines for usage, endpoint descriptions, and sample requests/responses.

## Tech Stack

- **Node.js:** Server-side JavaScript runtime.
- **Typescript:** Type system.
- **Docker:** Deploying applications in different environments.
- **Zod:** Server-side validation.
- **Express.js**: Web framework for building APIs.
- **MongoDB:** NoSQL database for flexible data storage.
- **Mongoose:** ODM (Object Data Modeling) library for MongoDB.
- **Typegoose:** Define Mongoose models using Typescript classes.
- **JWT:** For secure user authentication and authorization.
- **Multer:** Upload file and validation image.
- **NodeMailer:** sending mail.
- **Swagger & OpenAPI:** for documention.

## Environment Variables

The project relies on a set of environment variables to configure various aspects of the CMS API. Here’s a description of each variable:

- **NODE_ENV**: Defines the environment in which the app is running. Defaults to development
- **PORT**: The port on which the server will run. Defaults to 3000
- **STATIC_FILE_ADDRESS**: URL address for serving static files such as images. Defaults to http://localhost:3000/images/

### MongoDB Configuration:

- **MONGO_USERNAME**: MongoDB database username
- **MONGO_PASSWORD**: MongoDB database password
- **MONGO_HOSTNAME**: The hostname or address of the MongoDB instance
- **MONGO_PORT**: The port on which MongoDB is running Defaults to 27017
- **MONGO_DB**: The name of the MongoDB database Defaults to cms-blog-db

### JWT Token Configuration:

- **ACCESS_TOKEN_SECRET_KEY**: your_access_Token_Secret_Key
- **REFRESH_TOKEN_SECRET_KEY**: your_refresh_Token_Secret_Key
- **ACCESS_TOKEN_LIFETIME**: Duration (in milliseconds) for which the access token remains valid (Default to 86400000 = 1 day)
- **REFRESH_TOKEN_LIFETIME**: Duration (in milliseconds) for which the access token remains valid (Default to 604800000 = 7 day)

### Email Configuration:

- **EMAIL_USER**: Email address used for sending notifications or verification emails. Default to bal6v4mjdoztxqyx@ethereal.email
- **EMAIL_PASSWORD**: Password for the email account used for sending emails. Default to 9tx57vsV6fC8477K31

## API Endpoints

Here are the summary endpoints offered by the CMS API:

- **User Authentication**:

  - `POST /auth/login` : login user
  - `POST /auth/register` : register user
  - `GET /auth/me` : get user
  - `PATCH /auth/me` : update user
  - `DELETE /auth/me` : delete user
  - `POST /auth/verify/{id}/{verifyCode}` : verify account
  - `POST /auth/changePassword` : change password
  - `POST /auth/forgotPassword` : forgot password
  - `POST /auth/resetPassword/{userId}/{passwordResetCode}` : reset password
  - `POST /auth/refreshToken` : generate access token with refresh token

- **Articles Management**:

  - `GET /articles`: list of articles
  - `POST /articles`: create article
  - `GET /articles/users/{userId}`: list of articles User
  - `GET /articles/{articleSlug}`: get article
  - `PUT /articles/{articleSlug}`: update article
  - `DELETE /articles/{articleSlug}`: delete article

- **Category Management**:
  - `GET /categories`: list of categories
  - `POST /categories`: create category
  - `GET /categories/{categorySlug}`: get category
  - `PUT /categories/{categorySlug}`: update category
  - `DELETE /categories/{categorySlug}`: delete category

**Note**: For a full list of available endpoints details and their usage, please run project with docker and go to http://localhost:3000/api-docs/

## Installation

- **Prerequisites:** Ensure you have installed docker and Docker-compose on your local machine
- **Default user admin for development**:
    - Email: admin@gmail.com
    - Password: admin1234
- for first time run application user admin is created but if you can disable user admin, just go to `server.ts` file and comment `await createUserAdmin();`
- if you can connect to mongodb with compass just use this uri:
    - `mongodb://localhost:3001`

## Steps

- Clone the repository

```bash
git clone https://github.com/MohammadBohluli/cms-blog-backend.git

cd cms-blog-backend
```

- Run project

```bash
docker compose up -d
```

- after above command project available :

  - local address: http://localhost:3000/api
  - document: http://localhost:3000/api-docs/

- if you need show logs and see request realtime

```bash
docker logs -f nodejs
```

- if you need shutdown all containers

```bash
docker compose down
```

## Coming Soon
- [ ]  add test case
- [ ]  user management by admin
- [ ]  strong check password
- [ ]  improvment validation Email
- [ ]  add like system
