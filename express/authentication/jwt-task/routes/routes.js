const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { users, posts } = require("../data/data.js");

const authMiddlewares = require("../middlewares/auth.middlware.js");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const userExists = users.find((u) => u.email === email);
    if (userExists) {
      return res.status(400).json({ message: "Email is already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({ email, password: hashedPassword });
    return res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error during registration" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = users.find((c) => c.email === email);
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ token });

  } catch (err) {
    return res.status(500).json({ message: "Server error during login" });
  }
});

router.get("/me", authMiddlewares, (req, res) => {
  return res.status(200).json({ user: req.user });
});

router.get("/posts", authMiddlewares, (req, res) => {
  return res.status(200).json({ posts: posts });
});

module.exports = router;