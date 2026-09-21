const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();
const db = require("../db");

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const checkUser = "SELECT * FROM users WHERE email = ?";

    db.query(checkUser, [email], async (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "Database error",
        });
      }

      if (results.length > 0) {
        return res.status(409).json({
          message: "Email already registered",
        });
      }

      // Testing ke liye plain password save
      const sql =
        "INSERT INTO users (email, password) VALUES (?, ?)";

      db.query(sql, [email, password], (err, result) => {
        if (err) {
          return res.status(500).json({
            message: "Signup failed",
          });
        }

        res.status(201).json({
          message: "Signup successful",
          userId: result.insertId,
        });
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});


// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Database error",
      });
    }

    if (results.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const user = results[0];

    // Testing ke liye direct password comparison
    if (password !== user.password) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Save successful login
    const logSql = `
      INSERT INTO login_logs (user_id, email)
      VALUES (?, ?)
    `;

    db.query(logSql, [user.id, user.email], (logErr) => {
      if (logErr) {
        console.log("Login log error:", logErr.message);
      }
    });

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
      },
    });
  });
});

module.exports = router;