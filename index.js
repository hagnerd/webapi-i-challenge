const express = require("express");
const cors = require("cors");

const db = require("./data/db");

const server = express();

server.use(express.json());
server.use(cors());

server.post("/api/users", (req, res) => {
  const { name, bio } = req.body;

  // We need both the name and bio properties to not be undefined
  // so if either is undefined, we should send a bad response error
  // to the user, and end the function early
  if (!name || !bio) {
    res.status(400).json({
      errorMessage: "Please provide name and bio for the user."
    });
    return;
  }

  db.insert({ name, bio })
    .then(({ id }) => {
      db.findById(id)
        .then(user => {
          if (!user) {
            res.status(404).json({
              error: "User not found."
            });
            return;
          }

          res.status(201).json({
            user
          });
        })
        .catch(() => {
          res.status(500).json({
            error: "There was an error while saving the user to the database"
          });
        });
    })
    .catch(() => {
      res.status(500).json({
        error: "There was an error while saving the user to the database"
      });
    });
});

server.get("/api/users", (_req, res) => {
  db.find()
    .then(users => {
      res.json({
        users
      });
    })
    .catch(() => {
      res.status(500).json({
        error: "The user information could not be retrieved."
      });
    });
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(user => {
      if (!user) {
        res.status(404).json({
          message: "The user with the specified ID does not exist."
        });

        return;
      }

      res.json({
        user
      });
    })
    .catch(() => {
      res.status(500).json({
        error: "The user information could not be retrieved."
      });
    });
});

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(user => {
      if (!user) {
        res.status(404).json({
          message: "The user with the specified ID does not exist."
        });
        return;
      }

      res.status(200).json({
        message: "User successfully deleted",
        id: user
      });
    })
    .catch(() => {
      res.status(500).json({
        error: "The user could not be removed"
      });
    });
});

server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;

  if (!name || !bio) {
    res.status(400).json({
      errorMessage: "Please provide name and bio for the user."
    });
    return;
  }

  db.update(id, { name, bio })
    .then(id => {
      if (!id) {
        res.status(404).json({
          message: "The user with the specified ID does not exist."
        });
        return;
      }

      db.findById(id)
        .then(user => {
          res.status(200).json({
            user
          });
        })
        .catch(() => {
          res.status(500).json({
            error: "The user information could not be modified."
          });
        });
    })
    .catch(() => {
      res.status(500).json({
        error: "The user information could not be modified."
      });
    });
});

server.listen(4000, () => {
  console.log(`The server is listening on port 4000`);
});
