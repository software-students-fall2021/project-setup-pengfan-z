const { Router } = require('express');
const axios = require('axios');

const majorsRouter = Router();

// schoolId is the school code from Schedge API
// Input: params about schoolId
// Output: objects with subject code as keys and subject names as values
// Example Input: http://localhost:5000/majors/UA => accessing majors in undergrad cas

majorsRouter.get('/:schoolId', (req, res) => {
    const { schoolId } = req.params;
    axios
        .get('https://schedge.a1liu.com/subjects')
        .then((response) => {
            const allMajors = response.data;
            if (Object.prototype.hasOwnProperty.call(allMajors, schoolId)) {
                const majorsList = allMajors[schoolId];
                return res.json(majorsList);
            }
            return res.status(404).json(`The school id ${schoolId} does not exist`);
        })
        .catch((err) => res.status(400).json(err.message));
});

module.exports = {
    majorsRouter,
};
