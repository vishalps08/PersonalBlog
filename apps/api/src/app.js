const express = require("express");

const app = express();

// Middleware
app.use(express.json());

// Health Check
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API is running"
    });
});

module.exports = app;
