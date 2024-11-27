# Employee Timesheet Management System

## Overview
The **Employee Timesheet Management System** is a full-stack web application for managing employee timesheets. It includes role-based access control for three types of users:

- **Admin**: Manage users and view all timesheets.
- **Manager**: View and approve/reject timesheets for their department.
- **Employee**: Submit and track their timesheets.

The app includes authentication and authorization using JWT and features a dark-themed user interface.

---

## Features

### Admin
- Add new users (register functionality).
- View all users.

### Manager
- View all timesheets.
- Approve or reject timesheets.

### Employee
- Submit timesheets.
- View the status of their submitted timesheets.

---

## Demo Credentials

To test the app, use the following credentials:

### **Admin**
- **Email**: admin@example.com
- **Password**: 12345678

### **Manager**
- **Email**: manager@example.com
- **Password**: 12345678

### **Employee**
- **Email**: employee@example.com
- **Password**: 12345678

---

## Technology Stack

### Frontend
- React with Vite
- TypeScript
- TailwindCSS (with ShadCN for form styling)

### Backend
- Node.js with Express
- MongoDB (Mongoose for schema management)
- JWT for authentication

---

## Installation

### Prerequisites
- **Node.js** (v16+)
- **MongoDB**
- **NPM/Yarn**

### Backend Setup

1. Clone the backend repository:
   ```bash
   git clone <backend-repo-link>
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```env
   PORT=5000
   MONGO_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
   ```

4. Start the server:
   ```bash
   npm start
   ```

   The backend server will be running at `http://localhost:5000`.

### Frontend Setup

1. Clone the frontend repository:
   ```bash
   git clone <frontend-repo-link>
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```env
   VITE_API_URL=http://localhost:5000/
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend app will be running at `http://localhost:5173`.

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user (Admin only).
- `POST /api/auth/login` - Login and retrieve a JWT token.

### Timesheets
- `POST /api/timesheets` - Submit a timesheet (Employee only).
- `GET /api/timesheets/mine` - View timesheets submitted by the logged-in employee.
- `GET /api/timesheets` - View all timesheets (Admin/Manager only).
- `PUT /api/timesheets/:id` - Approve or reject a timesheet (Manager only).

### Users
- `GET /api/users` - View all users (Admin only).

---

## Environment Variables

### Backend
- `PORT`: The port number for the backend server (default: 5000).
- `MONGO_URI`: The MongoDB connection string.
- `JWT_SECRET`: The secret key for JWT authentication.

### Frontend
- `VITE_API_URL`: The base URL for the backend API.

---

## Backend Repository

Find the backend repository [here](https://github.com/nishujangra/rbac-backend).
