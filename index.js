const express = require("express");

const db = require("./data/db");

const server = express();

server.use(express.json());

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
              error: "User not found"
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

server.listen(4000, () => {
  console.log(`The server is listening on port 4000`);
});
