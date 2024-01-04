const mongoose = require("mongoose");
const validator = require('validator');

const AdminRegisterSchema = new mongoose.Schema({
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
        default: null,
        required: true
    },
    role: {
        type: String,
        require: true
    }
}, {timestamps: true});

const admodel = mongoose.model('admin', AdminRegisterSchema);
await admodel.validate({name : null});

// const dataAdmin = admodel.discriminator('adda', AdminRegisterSchema)


module.exports = admodel