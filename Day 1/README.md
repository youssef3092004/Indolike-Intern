# Authentication & Notes API

This repository provides two functionalities:
1. **Authentication API**: A user registration and login system using JWT, MongoDB, and Express.js.
2. **Notes API**: A simple CRUD API to manage notes with MongoDB and Express.js.

## Requirements

Before running the application, ensure that the following are installed:

- **Node.js** (preferably the latest stable version)
- **MongoDB** (running locally or remotely)
- **dotenv** for environment variable management (JWT secret)

## Installation

1. Clone this repository to your local machine:
    ```bash
    git clone https://github.com/yourusername/auth-notes-api.git
    ```
2. Navigate to the project directory:
    ```bash
    cd auth-notes-api
    ```
3. Install the required dependencies:
    ```bash
    npm install
    ```
4. Create a `.env` file in the root of the project and define your JWT secret:
    ```bash
    JWT_SECRET=your_jwt_secret_key
    ```
5. Ensure that MongoDB is running on your local machine or connect to a remote MongoDB instance.

## Running the Application

To run the API locally, execute the following command:
```bash
npm start
```
The server will start and be accessible at `http://localhost:5000`.

## Endpoints

### Authentication API

1. **POST /register**
    - Register a new user with a username, email, and password.
    - **Request Body:**
      ```json
      {
         "username": "joe_404",
         "email": "joe@example.com",
         "password": "securepass"
      }
      ```
    - **Response:**
      ```json
      {
         "message": "User registered successfully!"
      }
      ```

2. **POST /login**
    - Log in an existing user by providing email and password. Upon successful login, a JWT token is returned.
    - **Request Body:**
      ```json
      {
         "email": "joe@example.com",
         "password": "securepass"
      }
      ```
    - **Response:**
      ```json
      {
         "message": "Login successful",
         "token": "jwt_token_here"
      }
      ```

3. **GET /dashboard**
    - A protected route that requires a valid JWT token in the Authorization header.
    - **Request Header:**
      ```text
      Authorization: Bearer jwt_token_here
      ```
    - **Response:**
      ```json
      {
         "message": "Welcome to the protected dashboard!",
         "user": { "id": "user_id_here", "username": "joe_404", "email": "joe@example.com" }
      }
      ```

### Notes API

1. **GET /notes**
    - Get all notes.
    - **Response:**
      ```json
      [
         {
            "_id": "note_id",
            "title": "Note 1",
            "content": "Content of note 1"
         },
         {
            "_id": "note_id_2",
            "title": "Note 2",
            "content": "Content of note 2"
         }
      ]
      ```

2. **GET /notes/:id**
    - Get a specific note by its ID.
    - **Response:**
      ```json
      {
         "_id": "note_id",
         "title": "Note 1",
         "content": "Content of note 1"
      }
      ```

3. **POST /notes**
    - Create a new note.
    - **Request Body:**
      ```json
      {
         "title": "Note 2",
         "content": "This is my second note"
      }
      ```
    - **Response:**
      ```json
      {
         "_id": "note_id_2",
         "title": "Note 2",
         "content": "This is my second note"
      }
      ```

4. **PUT /notes/:id**
    - Update an existing note by its ID.
    - **Request Body:**
      ```json
      {
         "title": "Updated Note 1",
         "content": "This is the updated content for my first note"
      }
      ```
    - **Response:**
      ```json
      {
         "_id": "note_id",
         "title": "Updated Note 1",
         "content": "This is the updated content for my first note"
      }
      ```

5. **DELETE /notes/:id**
    - Delete a specific note by its ID.
    - **Response:**
      ```json
      {
         "_id": "note_id",
         "title": "Note 1",
         "content": "Content of note 1"
      }
      ```

6. **DELETE /notes**
    - Delete all notes.
    - **Response:**
      ```json
      {
         "message": "All notes deleted successfully"
      }
      ```

## Error Handling

The API returns appropriate error responses in case of failures:
- **400 Bad Request**: If the request is invalid (e.g., invalid email/password).
- **401 Unauthorized**: If the user does not provide a valid JWT token.
- **500 Internal Server Error**: If there is a problem with the server or database.

## Technologies Used

- **Node.js**: JavaScript runtime for building the API.
- **Express.js**: Web framework for handling HTTP requests.
- **MongoDB**: NoSQL database for storing user and note data.
- **Mongoose**: ODM (Object Document Mapper) for interacting with MongoDB.
- **JWT (JSON Web Tokens)**: For authentication and secure token-based access.
- **bcryptjs**: For securely hashing user passwords.
- **dotenv**: For managing environment variables.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
