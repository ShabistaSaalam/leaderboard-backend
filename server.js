// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const app = express();
app.use(cors());
app.use(express.json());
import cors from "cors"; 

app.use(cors({
  origin: "https://leaderboard-frontend-site.onrender.com", // allow only your frontend origin
  methods: ["GET", "POST"], // methods you want to allow
}));
// Connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));
app.use("/api", userRoutes);
// Basic test route
app.get("/", (req, res) => {
  res.send("Leaderboard Backend is running");
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
