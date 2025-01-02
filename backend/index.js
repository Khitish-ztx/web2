const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));  

// Middleware to serve static files
app.use(express.static(path.join(__dirname, '../public')));

// MongoDB connection
mongoose.connect('mongodb+srv://khitish152006:1234@cluster0.q9vmk.mongodb.net/LOGUSERS')
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => {
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

// User login route
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(400).send("User not registered.");
        }

        // Check if the password is correct
        if (user.password !== password) {
            console.log("Incorrect password."); // Debugging statement
            return res.status(400).send("Incorrect password.");
        }

        // Send a success response
        console.log("Login successful..."); // Debugging statement
        res.json({ success: true, username: user.username })
        
    } catch (error) {
        console.error("Server error:", error); // Debugging statement
        res.status(500).send("Server error.");
    }
});    

// User registration route
app.post('/signup', async (req, res) => {
    try {
        const { username, password, confirmpassword } = req.body;

        // Check if passwords match
        if (password !== confirmpassword) {
            return res.status(400).send("Passwords do not match.");
        }       

        // Check if the user already exists
        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
            return res.status(400).send("Username already taken.");
        }

        // Create a new user
        const newUser = new User({ username, password, confirmpassword });
        await newUser.save();

        // Send a success response
        res.status(200).send("Registration successful.");

    } catch (error) {
        console.error("Server error:", error); // Debugging statement
        res.status(500).send("Server error.");
    }
});

// Home route (for testing)
app.get("/", (req, res) => {
    const filepath = path.join(__dirname, "../public/index.html");
    res.sendFile(filepath);
});

// Route for login.html
app.get("/login", (req, res) => {
    const filepath = path.join(__dirname, "../public/login.html");
    res.sendFile(filepath);
});

// Route for sign.html
app.get("/sign", (req, res) => {
    const filepath = path.join(__dirname, "../public/sign.html");
    res.sendFile(filepath);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
