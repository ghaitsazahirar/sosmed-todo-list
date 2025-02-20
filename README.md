
```markdown
# Sosmed Todo List

A simple CRUD API for managing to-do lists related to social media posts, built with **Node.js**, **Express.js**, and **MySQL**. The project uses Swagger for API documentation and follows RESTful API principles.

## Features

- Create, Read, Update, and Delete (CRUD) operations for Users and Todos.
- Manage social media to-do lists with fields like:
  - Post Title
  - Brand
  - Platform
  - Due Date
  - Payment
  - Status
- Uses MySQL database with relationships between `Users` and `Todos`.
- Swagger API documentation available at `/api-docs`.

---

## Prerequisites

1. [Node.js](https://nodejs.org/) installed (v18 or later recommended).
2. [MySQL](https://www.mysql.com/) installed and running.
3. A GitHub account for accessing the public repository.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ghaitsazahirar/sosmed-todo-list.git
   ```
2. Navigate to the project directory:
   ```bash
   cd sosmed-todo-list
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up your `.env` file with the following variables:
   ```plaintext
   DB_HOST=your-database-host
   DB_USER=your-database-username
   DB_PASSWORD=your-database-password
   DB_NAME=sosmed_todo_list
   PORT=3000
   ```

---

## Database Schema

### Users Table
| Field       | Type        | Null | Key | Extra           |
|-------------|-------------|------|-----|-----------------|
| id          | INT         | NO   | PRI | auto_increment  |
| name        | VARCHAR(255)| NO   |     |                 |
| email       | VARCHAR(255)| NO   |     |                 |
| created_at  | TIMESTAMP   | YES  |     | DEFAULT CURRENT_TIMESTAMP |
| updated_at  | TIMESTAMP   | YES  |     | ON UPDATE CURRENT_TIMESTAMP |

### Todos Table
| Field       | Type         | Null | Key | Extra           |
|-------------|--------------|------|-----|-----------------|
| id          | INT          | NO   | PRI | auto_increment  |
| post_title  | VARCHAR(255) | NO   |     |                 |
| brand       | VARCHAR(255) | NO   |     |                 |
| platform    | ENUM(...)    | NO   |     |                 |
| due_date    | DATE         | NO   |     |                 |
| payment     | DECIMAL(10,2)| NO   |     |                 |
| status      | ENUM(...)    | YES  |     | Default 'Pending' |
| user_id     | INT          | NO   | MUL |                 |
| created_at  | TIMESTAMP    | YES  |     | DEFAULT CURRENT_TIMESTAMP |
| updated_at  | TIMESTAMP    | YES  |     | ON UPDATE CURRENT_TIMESTAMP |

---

## Usage

### Run Locally
Start the server:
```bash
npm start
```
The server will run at `http://localhost:3000`.

### API Endpoints
| Method | Endpoint        | Description                  |
|--------|-----------------|------------------------------|
| GET    | `/users`        | Fetch all users             |
| POST   | `/users/create` | Create a new user           |
| PUT    | `/users/update/:id` | Update user details      |
| DELETE | `/users/delete/:id` | Delete a user           |
| GET    | `/todos`        | Fetch all todos             |
| POST   | `/todos/create` | Create a new todo           |
| PUT    | `/todos/update/:id` | Update todo details     |
| DELETE | `/todos/delete/:id` | Delete a todo           |

---

## Swagger Documentation

The Swagger documentation for all API endpoints is available at:
```
http://localhost:3000/api-docs
```

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add a meaningful commit message"
   ```
4. Push the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Author

Created by [Ghaitsa Zahira](https://github.com/ghaitsazahirar).
```

Let me know if there's anything you'd like to tweak!
