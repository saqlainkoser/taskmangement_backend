const User = require('../models/user');

// Create user (signup)
const createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        const token = await user.generateAuthToken();
        await user.save();
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
};

// Login user
const loginUser = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (error) {
        res.status(400).send({ error: 'Unable to login' });
    }
};

// Logout user
const logoutUser = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send();
    }
};

// Get user profile
const getUserProfile = async (req, res) => {
    res.send(req.user);
};

// Check user profile (POST)
const checkUserProfile = async (req, res) => {
    try {
        res.send(req.user);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update user
const updateUser = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        updates.forEach(update => req.user[update] = req.body[update]);
        await req.user.save();
        res.send(req.user);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        await req.user.remove();
        res.send(req.user);
    } catch (error) {
        res.status(500).send();
    }
};

module.exports = {
    createUser,
    loginUser,
    logoutUser,
    getUserProfile,
    checkUserProfile,
    updateUser,
    deleteUser
};
