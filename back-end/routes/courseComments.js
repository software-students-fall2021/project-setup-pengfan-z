const { Router } = require('express');
const axios = require('axios');
// Added as it is required for database intergration
const { Course, User } = require('../db');

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

courseCommentsRouter.post('/:courseId/:userId', async (req, res, next) => {
    // const { courseId } = req.params;

    const { courseId, userId } = req.params;

    const { comment } = req.body;
    comment.commenter = userId;
    // TODO: This creating and adding a comment to a Course record which may change based on how the schema is implemented in the database
    // Check that this relationship works

    const foundUser = await User.findOne({ username: userId });
    console.log(foundUser);
    if (foundUser) {
        foundUser.comments.push(comment);
        foundUser.courses.push(courseId);
        await foundUser.save();
    } else {
        return res.status(403).json({ message: 'Unauthorized' });
    }
    // User.find({ userId })
    //     .then((currUser) => {
    //         currUser.comments.push(comment);
    //         currUser.courses.push(courseId);
    //         currUser.save();
    //         res.redirect('/:courseId');
    //     })
    //     .catch((err) => next(err));

    const foundCourse = await Course.findOne({ courseId });
    if (foundCourse) {
        foundCourse.comments.push(comment);
        await foundCourse.save();
    } else {
        const newCourse = new Course({
            courseId,
            comments: [comment],
        });
        await newCourse.save();
    }

    res.json({ message: 'success' });
});
courseCommentsRouter.use((error, req, res, next) => {
    res.status(400).send(`Error: ${error.message}`);
});

module.exports = {
    courseCommentsRouter,
};
