const express = require("express");
const helmet = require("helmet");
const server = express();

//Routers
const userRouter = require("./users/userRouter");
server.use("/api/users", userRouter);

server.use(express.json());
server.use(helmet());

server.get("/", logger, (req, res) => {
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
