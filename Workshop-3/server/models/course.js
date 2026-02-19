const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    code: {
        required: true,
        type: Number
    },
    description: {
        required: true,
        type: String
    },
    profesorId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Professor'
    }
})

module.exports = mongoose.model('Course', courseSchema)