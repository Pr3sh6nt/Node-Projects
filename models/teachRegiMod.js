const mongoose = require("mongoose");
const validator = require('validator');


const TeacherRegisterSchema = new mongoose.Schema({
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
    },
    student_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student'
    }],
    
}, { timestamps: true })

module.exports = mongoose.model('teacher', TeacherRegisterSchema);

