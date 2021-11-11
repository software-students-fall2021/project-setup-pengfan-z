const mongoose = require('mongoose');

// This will be used when deployed on a hosting service where we point the hosting service to our Mongodb server
// const uri = process.env.MONGODB_URI;

// This should allow you to connect to the database from your local machines
const uri = 'mongodb+srv://admin:situsari@cluster0.1qim7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

// Users contain a username, a hash, an array of References to course objects, and an array of references to comments
const UserSchema = new mongoose.Schema({
    username: String,
    hash: String,
    comments: Array,
    courses: Array
})

// Courses contain the name of the course and an array of comments which contain a rating, a comment, and the name of the commenter
const CourseSchema = new mongoose.Schema({
    name: String,
    comments: [{
        rating: String,
        comment: String,
        commenter: String
    }]
})
const Course = mongoose.model('Course', CourseSchema);
const User = mongoose.model('User', UserSchema);

mongoose.connect(uri);

module.exports = { Course, User };