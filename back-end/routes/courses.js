const { Router } = require('express');
const axios = require('axios');

const coursesRouter = Router();

coursesRouter.get('/:schoolID/:subjectID', (req, res, next) => {
  const schoolID = req.params.schoolID;
  const subjectID = req.params.subjectID;
  axios
    .get('https://schedge.a1liu.com/current/current/' + schoolID + '/' + subjectID + '?full=true')
    .then((response) => {
      const allCourses = response.data;
      res.json(allCourses);
    })
    .catch((err) => next(err));
});

coursesRouter.use((error, req, res, next) => {
  res.status(500).send(`Error: ${error.message}`);
});

module.exports = {
  coursesRouter,
};
