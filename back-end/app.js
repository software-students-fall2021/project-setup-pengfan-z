const express = require("express");
const app = express();
const path = require("path");
const axios = require("axios"); // middleware for making requests to APIs
const morgan = require("morgan"); // middleware for nice logging of incoming HTTP requests

const { majorsRouter } = require("./routes/majors");
const { coursesRouter} = require("./routes/courses");
const { courseCommentsRouter } = require("./routes/courseComments");
const { courseinfoRouter } = require("./routes/courseinfo");

// use the morgan middleware to log all incoming http requests
app.use(morgan("dev")); // morgan has a few logging default styles - dev is a nice concise color-coded style
// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()); // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })); // decode url-encoded incoming POST data

// make 'public' directory publicly readable with static content
// app.use("/static", express.static("public"))

app.get("/", (req, res) => {
  res.send("Hello World.");
});

app.use("/majors", majorsRouter);

app.use("/courses", coursesRouter);

app.use("/comments", courseCommentsRouter);

app.use("/courseinfo", courseinfoRouter);

// start by calling nodemon server

module.exports = app;
