require('dotenv').config();
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const User = require('./models/user');
const Professor = require('./models/professor');
const { authenticateToken, generateToken } = require('./controller/auth');

const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;


database.on('error', (error) => {
    console.log(error)
});

database.once('connected', () => {
    console.log('Database Connected');
});


const app = express();

//middlewares
app.use(bodyParser.json());
app.use(cors({
    domains: '*',
    methods: '*'
}));

//autn routes
app.post('/auth/token', generateToken);

//routes
app.use('/api', require('./routes/course'));
app.use('/api', require('./routes/professor'));


app.get('/professor', async (req, res) => {
    try {
        if (!req.query.id) {
            const data = await Professor.find();
            return res.status(200).json(data)
        }
        const data = await Professor.findById(req.query.id);
        res.status(200).json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.patch('/professor', async (req, res) => {
    try {
        if (!req.query.id) {
            return res.status(400).json({ message: error.message })
        }

        const updatedProfessor = await Professor.findByIdAndUpdate(
            req.query.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedProfessor) {
            return res.status(404).json({ message: error.message })
        }

        res.status(200).json(updatedProfessor)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

app.delete('/professor', async (req, res) => {
    try {
        if (!req.query.id) {
            return res.status(400).json({ message: error.message })
        }

        const deletedProfessor = await Professor.findByIdAndDelete(req.query.id)

        res.status(200).json({ deletedProfessor })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//CRUD for user
app.post('/user', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        token: req.body.token
    })
    try {
        const userCreated = await user.save();
        res.status(201).json(userCreated)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});

//start the app
app.listen(3002, () => console.log(`UTN API service listening on port 3002!`))
