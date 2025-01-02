const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/LOGUSERS", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB Connected");
}).catch((err) => {
    console.log(err);
});

// Define a schema for the user model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmpassword: { type: String, required: true }
});

// Create the user model
const User = mongoose.model("loginuser", userSchema);

// User registration route
app.post("/register", async (req, res) => {
    try {
        const { username, password, confirmpassword } = req.body;

        // Check if passwords match
        if (password !== confirmpassword) {
            return res.status(400).send("Passwords do not match.");
        }

        // Check if the user already exists
        const userExists = await User.findOne({ username: username });
        if (userExists) {
            return res.status(400).send("User already exists.");
        }

        // Create a new user
        const newUser = new User({
            username,
            password,
            confirmpassword
        });

        // Save the user to the database
        await newUser.save();

        // Send a success response
        res.status(201).send("User registered successfully.");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error.");
    }
});

// User login route
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(400).send("User not registered.");
        }

        // Check if the password is correct
        if (user.password !== password) {
            return res.status(400).send("Incorrect password.");
        }

        // Send a success response
        res.status(200).send("Login successful.");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error.");
    }
});

// Home route (for testing)
app.get("/", (req, res) => {
    res.send("Welcome to the backend!");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
