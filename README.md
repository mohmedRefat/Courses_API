# 👨‍💻 Courses API

A **RESTful API** built with **Node.js** and **Express.js** for managing courses with secure authentication and a modular backend structure.

The project implements authentication, password security, middleware handling, and a clean architecture to keep the code scalable and maintainable.

---

## 👨‍💻 Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **JWT Authentication**
* **Bcrypt**

---

## 👨‍💻 Features

* Create course
* Get all courses
* Get single course
* Update course
* Delete course
* User authentication with **JWT**
* Password hashing with **bcrypt**
* Middleware for request handling
* Centralized utilities for reusable logic

---

## 👨‍💻 Project Structure

```
.
├── .github
├── .vscode
├── Data
├── controller
├── middleware
├── model
├── router
├── utils
├── .gitignore
├── app.js
├── package.json
└── package-lock.json
```

---

## 👨‍💻 Installation

```
npm install
```

---

## 👨‍💻 Run The Server

```
npm start
```

or

```
node app.js
```

---

## 👨‍💻 Authentication

Authentication is implemented using **JWT (JSON Web Token)**.
Passwords are securely hashed using **bcrypt** before storing them in the database.

---

## 👨‍💻 Database

The project uses **MongoDB** with **Mongoose ODM** for schema modeling and database interaction.

---

## 👨‍💻 API Architecture

The backend follows a modular structure:

* **Controllers** → handle request logic
* **Routers** → define API endpoints
* **Models** → database schema
* **Middleware** → authentication and request processing
* **Utils** → reusable helper functions

---

## 👨‍💻 License

MIT License
