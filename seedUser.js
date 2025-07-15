const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

const initialUsers = ["Rahul", "Kamal", "Sanak", "Neha", "Arjun", "Zoya", "Amit", "Priya", "Kabir", "Meera"];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to DB. Seeding users...");
    await User.deleteMany(); // clean old users if needed

    const created = await User.insertMany(
      initialUsers.map(name => ({ name }))
    );

    console.log("Users seeded:", created.map(u => u.name));
    process.exit();
  })
  .catch(err => {
    console.error("DB connection failed", err);
    process.exit(1);
  });
