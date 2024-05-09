import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/
    },
    mobileNo: {
        type: String,
        match: /^[0-9]{10}$/
    },
    designation: {
        type: String
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other']
    },
    course: {
        type: String
    },
    img: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true,
        index: true
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        index: true
    }
});

export const Employee = mongoose.model('Employee', schema);
