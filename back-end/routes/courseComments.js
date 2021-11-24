const { Router } = require('express');
const axios = require('axios');
// Added as it is required for database intergration
const { Course } = require('../db');

const courseCommentsRouter = Router();

// Just a placeholder to simulate importing the Courses database
// const { Course } = db;

courseCommentsRouter.get('/:schoolId/:subjectId/:courseId', async (req, res, next) => {
    const { schoolId, subjectId, courseId } = req.params;
    // TODO: get comments from mongodb databases
    axios
        .get('https://my.api.mockaroo.com/user_review.json?key=eccb0b30')
        .then((response) => {
            const userReviews = response.data;
            res.json(userReviews);
        })
        .catch((err) => next(err));
});

courseCommentsRouter.post('/:courseId', async (req, res, next) => {
    // const { courseId } = req.params;

    const id = req.params;
    const { comment } = req.body;
    // TODO: This creating and adding a comment to a Course record which may change based on how the schema is implemented in the database
    // Check that this relationship works
    Course.find({ courseId: id })
        .then((currCourse) => {
            currCourse.comments.push(comment);
            currCourse.save();
            res.redirect('/:courseId');
        })
        .catch((err) => next(err));
});
courseCommentsRouter.use((error, req, res, next) => {
    res.status(error.httpStatusCode).send(`Error: ${error.message}`);
});

module.exports = {
    courseCommentsRouter,
};
