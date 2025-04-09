# 👥 User Management REST API

This project provides a full-featured REST API for managing users, roles, and role-based authentication using **Node.js**, **Express**, **Sequelize**, **PostgreSQL**, and **JWT**.

---

## 🚀 Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Sequelize (ORM)
- JWT (Authentication)
- bcrypt (Password Hashing)

---

## ⚙️ Prerequisites

Before starting, make sure you have:

- Node.js (v16+)
- PostgreSQL (running locally or remotely)
- Postman (optional, for testing)

---

## 📁 Project Setup

1. **Clone the Repository**
   ```bash
    https://github.com/sanket9921/User_Management.git
    cd user-management-api
2. **Install Dependencies**
    npm install

3. **Set Up Environment Variables**
    PORT=5000
    JWT_SECRET=your_jwt_secret_key
    DB_NAME=user_management
    DB_USER=postgres
    DB_PASS=password
    DB_HOST=localhost
4. **Run Database Migrations**
    npx sequelize-cli db:migrate
5. **(Optional) Seed Roles**
    npx sequelize-cli db:seed:all
6. **Start the Server**
    npm start
```
