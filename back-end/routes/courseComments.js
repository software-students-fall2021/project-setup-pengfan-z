const { Router } = require("express");
const axios = require("axios");

const courseCommentsRouter = Router();

courseCommentsRouter.get("/:courseId", async (req, res, next) => {
    const courseId = req.params.courseId;
    // TODO: use courseId to get comments from mongodb databases
    axios
      .get("https://my.api.mockaroo.com/user_review.json?key=eccb0b30")
      .then((response) => {
        const userReviews = response.data;
        res.json(userReviews);
      })
      .catch((err) => next(err));
});

courseCommentsRouter.use((error, req, res, next) => {
    res.status(error.httpStatusCode).send(`Error: ${error.message}`);
});

module.exports = {
    courseCommentsRouter
};