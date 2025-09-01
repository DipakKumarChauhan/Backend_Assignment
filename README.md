# ME-API_PLAYGROUND

ME-API_PLAYGROUND is a full-stack web application that allows users to manage candidate profiles, including their skills, education, projects, and work experience. The project is divided into two parts: the backend (Node.js/Express) and the frontend (React).

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [License](#license)

---

## Features

### Backend

- RESTful API for managing candidate profiles.
- CRUD operations for profiles.
- Search profiles by skill.
- Fetch top skills based on frequency.
- MongoDB integration for data persistence.
- Authentication middleware for secure API access.

### Frontend

- React-based UI for interacting with the backend.
- View candidate profiles.
- Search profiles by skill.
- Add or update candidate profiles.
- Display top skills.

---

## Technologies Used

### Backend

- Node.js
- Express.js
- MongoDB (via Mongoose)
- dotenv for environment variable management
- express-validator for input validation
- morgan for HTTP request logging
- cors for cross-origin resource sharing

### Frontend

- React
- Bootstrap for styling
- Fetch API for making HTTP requests

---

## Project Structure

```
ME-API_PLAYGROUND/
├── backend/
│   ├── .env
│   ├── package.json
│   ├── src/
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   └── profileController.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   └── validateProfile.js
│   │   ├── models/
│   │   │   └── Profile.js
│   │   ├── routes/
│   │   │   └── profileRoutes.js
│   │   └── seed.js
│   └── README.md
├── frontend/
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js
│   │   ├── ProfileView.js
│   │   ├── ProfileForm.js
│   │   ├── SearchBySkill.js
│   │   ├── TopSkills.js
│   │   └── index.js
│   └── README.md
└── README.md
```

---

## Setup Instructions

### Backend

1. Navigate to the `backend` directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory and configure the following variables:

   ```
   MONGODB_URI=<your-mongodb-uri>
   PORT=8000
   AUTH_TOKEN=<your-auth-token>
   ```

4. Seed the database (optional):

   ```bash
   node src/seed.js
   ```

5. Start the backend server:

   ```bash
   npm run dev
   ```

   The backend will run on `http://localhost:8000`.

---

### Frontend

1. Navigate to the `frontend` directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend development server:

   ```bash
   npm start
   ```

   The frontend will run on `http://localhost:3000`.

---

## API Endpoints

### Profile Endpoints

- **POST** `/api/profile`: Create or update a profile.
- **GET** `/api/profile/search?q=<skill>`: Search profiles by skill.
- **GET** `/api/profile/top/skills`: Get top skills.
- **GET** `/api/profile/:email`: Get a profile by email.

## License

This project is licensed under the MIT License. You are free to use, modify, and distribute this project as per the license terms.
