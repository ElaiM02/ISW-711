const Course = require('../models/course');

const coursePost = async (req, res) => {
    const course = new Course({
        name: req.body.name,
        code: req.body.code,
        description: req.body.description,
        professorId: req.body.professorId
    })

    try {
        const courseCreated = await course.save();
        res.header('Location', `/course?id=${courseCreated._id}`);
        res.status(201).json(courseCreated)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
};

const courseGet = async (req, res) => {
    try {
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
}

const coursePatch = async (req, res) => {
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
}
const courseDelete = async (req, res) => {
    try {
        if (!req.query.id) {
            return res.status(400).json({ message: error.message })
        }

        const deletedCourse = await Course.findByIdAndDelete(req.query.id)

        res.status(200).json({ deletedCourse })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    coursePost,
    courseGet,
    coursePatch,
    courseDelete
}
