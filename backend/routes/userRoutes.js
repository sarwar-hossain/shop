const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('./../models');
// Store hashedPassword in database


// 👉 Fetch Products Collection
router.get('/login', async (req, res) => {
    try {
        const LoginDataList = await User.find();
        res.json(LoginDataList);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products collection' });
    }
});

// Route to fetch user data
router.get("/get-user", async (req, res) => {
    try {
      const userEmail = req.cookies.userEmail; // Get the user's email from the cookie
  
      if (!userEmail) {
        return res.status(401).json({ error: "Not logged in" });
      }
  
      // Find the user by email
      const user = await User.findOne({ email: userEmail });
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Return the user's name
      res.json({ user });
    } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).json({ error: "Failed to fetch user data" });
    }
  });

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Check if the password matches
    if (user.password !== password) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // Set a cookie with the user's email ID
    res.cookie("userEmail", user.email, {
      httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
      maxAge: 24 * 60 * 60 * 1000, // Cookie expires in 1 day
    });

    // If everything is correct, return success
    res.json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Failed to login" });
  }
});


  // Signup route
  router.post("/signup", async (req, res) => {
    try {
      const { name, email, password, confirmPassword } = req.body;
  
      // Validate password and confirm password
      if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
      }
  
      // Check if the email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }
  
      // Create a new user document
      const newUser = new User({ name, email, password });
      await newUser.save();
  
      res.json({ message: "User registered successfully", newUser });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Failed to register user" });
    }
  });

  // Logout route
router.post("/logout", (req, res) => {
    try {
      // Clear the user's cookie
      res.clearCookie("userEmail", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Ensure secure cookies in production
      });
  
      res.json({ message: "Logout successful" });
    } catch (error) {
      console.error("Error logging out:", error);
      res.status(500).json({ error: "Failed to logout" });
    }
  });

router.delete('/login/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        console.log('Deleting Products item with ID:', itemId); // Log the ID

        // Check if the ID is valid
        if (!itemId || itemId.length !== 24) {
            return res.status(400).json({ error: 'Invalid item ID' });
        }

        const deletedItem = await User.findByIdAndDelete(itemId);

        if (!deletedItem) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.json({ message: 'Products item deleted successfully', deletedItem });
    } catch (error) {
        console.error('Error deleting Products item:', error);
        res.status(500).json({ error: 'Failed to delete Products item' });
    }
});




module.exports = router;