const { Router } = require('express');
const passport = require('passport');
const passportConf = require('../passport');
// Added as it is required for database intergration
const { Course, User } = require('../db');

const courseCommentsRouter = Router();

courseCommentsRouter.use(passport.initialize());

courseCommentsRouter.get('/:schoolId/:subjectId/:courseId', async (req, res, next) => {
    const { schoolId, subjectId, courseId } = req.params;

    Course.find({ courseId: `${schoolId}-${subjectId}-${courseId}` }, (err, data) => {
        if (err) {
            res.status(500).send(`Error: ${err.message}`);
        } else {
            
            res.json(data);
        }
    });
});

courseCommentsRouter.post(
    '/:courseId/:userId',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {

        const { courseId, userId } = req.params;

        const { comment } = req.body;
        comment.commenter = userId;
        comment.courseId = courseId;

        const user = await User.findOne({ username: userId });
        if (user) {
            if (user.comments !== null) {
                const found = await user.comments.some((el) => {
                    console.log(el);
                    return el.courseId === courseId;
                });
                if (found) {
                    return res
                        .status(404)
                        .json({ message: 'The user has already made a comment for this course.' });
                }
            }
        } else {
            return res.status(403).json({ message: 'Forbidden' });
        }

        User.findOneAndUpdate(
            { username: userId },
            { $push: { comments: comment } },
            (error, success) => {
                if (error) {
                    console.log(error);
                    return res.status(404).json({ message: error });
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
    }
);
courseCommentsRouter.use((error, req, res) => {
    res.status(400).send(`Error: ${error.message}`);
});

module.exports = {
    courseCommentsRouter,
};
