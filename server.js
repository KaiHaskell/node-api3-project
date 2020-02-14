const express = require("express");
const userRouter = require("./users/userRouter");

const server = express();
server.use(express.json());

//Routers

server.use("/api/users", logger, userRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(
    `${req.method} request to ${req.originalUrl} at ${new Date().toUTCString()}`
  );
  next();
}

module.exports = server;
