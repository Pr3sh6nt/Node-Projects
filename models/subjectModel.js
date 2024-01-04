const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    subName: {
        type: String,
        require: true,
        unique: true
    },
    subCode: {
        type: String,
        require: true,
        unique: true
    },
    author: {
        type: String,
        require: true
    }

}, { timestamps: true });

module.exports = mongoose.model('subject', subjectSchema);