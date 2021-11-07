const { Router } = require("express");
const axios = require("axios");

const majorsRouter = Router();

// schoolId is the school code from Schedge API
// Input: params about schoolId
// Output: objects with subject code as keys and subject names as values
// Example Input: http://localhost:5000/majors/UA => accessing majors in undergrad cas

majorsRouter.get("/:schoolId", (req, res, next) => {
  const schoolId = req.params.schoolId;
  axios
    .get("https://schedge.a1liu.com/subjects")
    .then((response) => {
      const allMajors = response.data;
      if (allMajors.hasOwnProperty(schoolId)) {
        //TODO
        const majorsList = allMajors[schoolId];
        res.json(majorsList);
      } else {
        const error = new Error(`The school id ${schoolId} does not exist`);
        error.httpStatusCode = 400;
        throw error;
      }
    })
    .catch((err) => next(err));

  // // res.json(allMajors);
  // res.send(allMajors);
});

//error handling
majorsRouter.use((error, req, res, next) => {
  res.status(error.httpStatusCode).send(`Error: ${error.message}`);
});

module.exports = {
  majorsRouter,
};
