const mongoose = require("mongoose");
const validator = require('validator');

const StudentRegisterSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        validite(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email please provide valid Email!...");
            }
        }
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    role: {
        type: String,
        require: true
    }
}, {timestamps: true});

module.exports = mongoose.model('student', StudentRegisterSchema);