require('dotenv').config();
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const Course = require('./models/course');
const Professor = require('./models/professor');
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


//routes
app.post('/course', async (req, res) => {
    const course = new Course({
        name: req.body.name,
        credits: req.body.credits
    })

    try {
        const courseCreated = await course.save();
        //add header location to the response
        res.header('Location', `/course?id=${courseCreated._id}`);
        res.status(201).json(courseCreated)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});

app.get('/course', async (req, res) => {
    try {
        //if id is passed as query param, return single course else return all courses
        if (!req.query.id) {
            const data = await Course.find();
            return res.status(200).json(data)
        }
        const data = await Course.findById(req.query.id);
        res.status(200).json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.patch('/course', async (req, res) => {
    try {
        if (!req.query.id) {
            return res.status(400).json({ message: error.message })
        }

        const updatedCourse = await Course.findByIdAndUpdate(
            req.query.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedCourse) {
            return res.status(404).json({ message: error.message })
        }

        res.status(200).json(updatedCourse)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

app.delete('/course', async (req, res) => {
    try {
        if (!req.query.id) {
            return res.status(400).json({ message: error.message })
        }

        const deletedCourse = await Course.findByIdAndDelete(req.query.id)

        res.status(200).json({ deletedCourse })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//CRUD for professor
app.post('/professor', async (req, res) => {
    const professor = new Professor({
        name: req.body.name,
        lastName: req.body.lastName,
        cedula: req.body.cedula,
        age: req.body.age
    })

    try {
        const professorCreated = await professor.save();
        res.header('Location', `/professor?id=${professorCreated._id}`);
        res.status(201).json(professorCreated)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});

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

//start the app
app.listen(3002, () => console.log(`UTN API service listening on port 3002!`))
