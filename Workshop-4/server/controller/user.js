const User = require('../models/user');

application.post('/auth/token', async (req, res) => {
    const user = new User({
        name: 'Eliam',
        email: 'eliam@gmail.com',
        password: '123456',
        token: ''
    })
    try {
        const userCreated = await user.save();
        res.status(201).json(userCreated)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});