const Professor = require('../models/professor');

const professorPost = async (req, res) => {
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
};

const professorGet = async (req, res) => {
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
}

const professorPatch = async (req, res) => {
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
}

const professorDelete = async (req, res) => {
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
}

module.exports = {
    professorPost,
    professorGet,
    professorPatch,
    professorDelete
}