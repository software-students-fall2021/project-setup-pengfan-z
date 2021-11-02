const { Router } = require("express");

const majorsRouter = Router();

majorsRouter.get("/", (req, res) => {
  res.send("Got a GET request for majors");
});

module.exports = {
  majorsRouter,
};
