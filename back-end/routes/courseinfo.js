const { Router } = require("express");
const axios = require("axios");

const courseinfoRouter = Router();

courseinfoRouter.get("/:courseId", (req, res, next) => {
  const courseId = req.params.courseId;
  axios
    .get("https://my.api.mockaroo.com/courseid.js?key=cc3f9050")
    .then((response) => {
      const courseinfo = response.data;
      res.json(courseinfo);
    })
    .catch((err) => next(err));
});

courseinfoRouter.use((error, req, res, next) => {
  res.status(404).send(`Error: ${error.message}`);
});

module.exports = {
  courseinfoRouter,
};
