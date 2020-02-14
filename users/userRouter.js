const express = require("express");
const Users = require("./userDb");
const Posts = require("../posts/postDb");

const router = express.Router();

//get a list of all users
router.get("/", (req, res) => {
  // do your magic!
});

//get a specific user
router.get("/:id", (req, res) => {
  // do your magic!
});

//create new user
router.post("/", (req, res) => {
  User.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Error adding new user"
      });
    });
});

//create new post for a user
router.post("/:id/posts", (req, res) => {
  const postInfo = { ...req.body, user_id: req.params.id };
  Posts.insert(postInfo)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Error adding a new post"
      });
    });
});

//get a specific users complete post history
router.get("/:id/posts", (req, res) => {
  Users.getUsee;
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
