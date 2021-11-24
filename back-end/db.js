const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// This will be used when deployed on a hosting service where we point the hosting service to our Mongodb server
// const uri = process.env.MONGODB_URI;
require('dotenv').config();

const uri = process.env.MONGODB_URI;

// Users contain a username, a hash, an array of References to course objects, and an array of references to comments
const UserSchema = new mongoose.Schema({
    username: String,
    // username: {
    //     type: String,
    //     required: true,
    //     unique: true,
    //     lowercase: true
    // }
    hash: String,
    // hash: {
    //     type: String,
    //     required: true
    // }
    comments: Array,
    courses: Array,
});

UserSchema.pre('save', async function (next) {
    try {
        // generate a salt
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(this.hash, salt);
        // reassign hashed version password
        this.hash = passwordHash;
        next();
    } catch (error) {
        next(error);
    }
});

UserSchema.methods.isValidPassword = async function (newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.hash);
    } catch (error) {
        throw new Error(error);
    }
};

// Courses contain the name of the course and an array of comments which contain a rating, a comment, and the name of the commenter
const CourseSchema = new mongoose.Schema({
    name: String,
    courseId: Number,
    comments: [
        {
            rating: String,
            comment: String,
            commenter: String,
        },
    ],
});
const Course = mongoose.model('Course', CourseSchema);
const User = mongoose.model('User', UserSchema);

mongoose.connect(uri);

module.exports = { Course, User };
