// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/users');

const router = express.Router();

// Registration route
router.post('/register', userController.registerUser);

// Login route
router.post('/login', userController.loginUser);

module.exports = router;
