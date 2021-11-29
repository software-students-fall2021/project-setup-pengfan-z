const { Router } = require('express');
const axios = require('axios');
// Added as it is required for database intergration
const { Course, User } = require('../db');

const courseCommentsRouter = Router();

// TODO: Add authentication

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

courseCommentsRouter.post('/:courseId/:userId', async (req, res) => {
    // const { courseId } = req.params;

    const { courseId, userId } = req.params;

    const { comment } = req.body;
    comment.commenter = userId;
    // TODO: This creating and adding a comment to a Course record which may change based on how the schema is implemented in the database
    // Check that this relationship works

    User.findOneAndUpdate(
        { username: userId },
        { $push: { comments: comment } },
        (error, success) => {
            if (error) {
                console.log(error);
                return res.status(403).json({ message: 'Unauthorized' });
            }

            console.log(success);
        }
    );

    const foundCourse = await Course.findOne({ courseId });
    if (!foundCourse) {
        const newCourse = new Course({
            courseId,
            comments: [comment],
        });
        await newCourse.save();
    } else {
        Course.findOneAndUpdate(
            { courseId },
            { $push: { comments: comment } },
            (error, success) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
            }
        );
    }

    res.json({ message: 'success' });
});
courseCommentsRouter.use((error, req, res) => {
    res.status(400).send(`Error: ${error.message}`);
});

module.exports = {
    courseCommentsRouter,
};
