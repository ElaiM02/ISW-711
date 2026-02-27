const e = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');


const generateToken = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: error.message });
    }

    try {
        const user = await User.findOne({ email });

        if (!user || user.password !== password) {
            return res.status(401).json({ message: error.message });
        }

        const token = await bcrypt.hash(email + password, 10);

        user.token = token;
        await user.save();

        return res.status(201).json({ token: user.token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    generateToken
};