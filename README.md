# Ski Resort Conditions App

A full-stack MERN application for real-time ski resort reports. Check live trail openings, lift statuses, and user-submitted condition reports — all in one place.

---

## Features

- **Real-Time Conditions** – View trail openings, lift queue times, and current weather data
- **User Reports** – Submit condition reports with ratings and comments
- **Favorites System** – Save and track your favorite resorts
- **Role-Based Access** – Admin users can update lift and trail data directly
- **JWT Authentication** – Secure login and registration
- **Responsive UI** – Clean, mobile-friendly React interface

---

## Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React, CSS                        |
| Backend   | Node.js, Express                  |
| Database  | MongoDB (Atlas or local)          |
| Auth      | JSON Web Tokens (JWT)             |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) (included with Node.js)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) cluster or a local MongoDB instance

### 1. Clone the Repository

```bash
git clone https://github.com/sherrer08/ski-resort-app.git
cd ski-resort-app
```

### 2. Configure Environment Variables

Copy the example environment file and fill in your values:

```bash
cp .env.example .env
```

Open `.env` and update the following:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

### 3. Install Dependencies & Start the Backend

```bash
cd backend
npm install
node server.js
```

The backend will run at `http://localhost:5000`.

### 4. Install Dependencies & Start the Frontend

Open a new terminal window:

```bash
cd frontend
npm install
npm start
```

The app will open in your default browser at `http://localhost:3000`.

---

## Project Structure

```
ski-resort-app/
├── backend/        # Express API, routes, models, middleware
├── frontend/       # React app, components, pages
├── .env.example    # Environment variable template
├── .gitignore
└── README.md
```

---

## Author

**Michael Sherrer**  
[GitHub](https://github.com/sherrer08)
