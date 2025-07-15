# Leaderboard Backend

This is the backend API for the Leaderboard project. It is built with Node.js and Express, uses MongoDB to store user data and claim history, and provides endpoints to manage users, claim random points, and fetch the leaderboard.

## Features

- Manage users (create, list)
- Claim random points (1-10) for a selected user
- Track claim history for each user
- Calculate dynamic user rankings based on total points

## Technologies

- Node.js
- Express.js
- MongoDB (using Mongoose)
- REST API

## Setup and Run

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/leaderboard-backend.git
   cd leaderboard-backend
2. Install dependencies:
    npm install
3. Create a .env file in the root directory and add:
    MONGO_URI=your_mongodb_connection_string
    PORT=5000
4. Running the Server
    Start the development server with:
    npm start
    The API will be available at: http://localhost:5000

API Endpoints

GET /api/users
Get all users with their total points.

POST /api/users
Add a new user.
Request body example:
{
  "name": "Rahul"
}

POST /api/claim
Claim random points (1 to 10) for a user.
Request body example:
{
  "userId": "60c72b2f9b1d4c23d8f8a1d9"
}

GET /api/leaderboard
Get the leaderboard sorted by total points descending.