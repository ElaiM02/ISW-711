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

module.exports = {
    professorPost
}