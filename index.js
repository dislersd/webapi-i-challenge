// implement your API here

const express = require("express");
const db = require("./data/db.js");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("hello");
});

// ########################################
// ########################################

server.post("/users", (req, res) => {
  const userInfo = req.body;
  console.log("user info", userInfo);
  db.insert(userInfo)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json({ message: "error updating" });
    });
});

// ########################################
// ########################################

server.get("/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ message: "error retrieving users" });
    });
});

server.get("/users/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(user => {
      res.status(203).json(user);
    })
    .catch(error => {
      res.status(500).json({ message: "error retrieving user" });
    });
});

// ########################################
// ########################################

server.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(removed => {
      res.status(204).end();
    })
    .catch(error => {
      res.status(500).json({ message: "error deleting" });
    });
});

// ########################################
// ########################################

server.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.update(id, changes)
    .then(updated => {
      if (updated) {
        res.status(205).json(updated);
      } else {
        res.status(404).json({ message: "user not found " });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "error updating " });
    });
});

server.listen(3000, () => {
  console.log(`\n** Up and running on port 3K`);
});
