const server = require("./app");

const port = 5000;

// call a function to start listening to the port
const listener = server.listen(port, function () {
  console.log(`Server running on port: ${port}`);
});

// a function to stop listening to the port
const close = () => {
  listener.close();
};

// export the close function
module.exports = {
  close: close,
};
