const express = require("express");
const Users = require("./userDb");
const Posts = require("../posts/postDb");

const router = express.Router();

//get a list of all users ✅
router.get("/", (req, res) => {
  Users.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Unable to fetch list of users" });
    });
});

//get a specific user ✅
router.get("/:id", validateUserId, (req, res) => {
  Users.getById(req.params.id)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Unable to fetch that user" });
    });
});

//create new user ❌
router.post("/", validateUser, (req, res) => {
  console.log(req.name);
  Users.insert(req.name)
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

//create new post for a user ❌
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

//get a specific users complete post history ✅
router.get("/:id/posts", (req, res) => {
  Users.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ ERROR: "Unable to retrieve that users posts" });
    });
});

//delete a specific user ✅
router.delete("/:id", (req, res) => {
  Users.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "The user has been removed" });
      } else {
        res.status(404).json({ message: "The user could not be found" });
      }
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: "Error removing the hub"
      });
    });
});

router.put("/:id", (req, res) => {
  // do your magic!
});

//custom middleware

// WORKING ✅
function validateUserId(req, res, next) {
  const id = req.params.id;
  console.log("\nid\n", id);

  Users.getById(id).then(user => {
    if (user) {
      console.log("user", user);
      next();
    } else {
      res.status(400).json({ message: "User does not exist" });
    }
  });
}

//WORKING ❓
function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing post data" });
  } else if (!req.body.text) {
    res.status(400).json({ message: "missing required text field" });
  }
  console.log(req.body);
  next();
}

//WORKING ❓
function validatePost(req, res, next) {
  const user_id = req.params.id;
  const body = { ...req.body, user_id: user_id };
  console.log("user_id", user_id, "body", body);
  if (body.text) {
    console.log("has text");
    next();
  } else {
    console.log("has no text");
    res.status(400).json({ message: "missing required text field" });
  }
}

module.exports = router;
