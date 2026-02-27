const mongosee = require('mongoose');
const userSchema = new mongosee.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongosee.model('User', userSchema);