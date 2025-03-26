const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const {
    createUser,
    loginUser,
    logoutUser,
    getUserProfile,
    checkUserProfile,
    updateUser,
    deleteUser
} = require('../controllers/userController');

// Create user (signup)
router.post('/users', createUser);

// Login user
router.post('/users/login', loginUser);

// Logout user
router.post('/users/logout', auth, logoutUser);

// Get user profile
router.get('/users/me', auth, getUserProfile);

// Check user profile (POST)
router.post('/users/me', auth, checkUserProfile);

// Update user
router.patch('/users/me', auth, updateUser);

// Delete user
router.delete('/users/me', auth, deleteUser);

module.exports = router;
