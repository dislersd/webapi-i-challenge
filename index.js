// implement your API here

const express = require("express");
const db = require("./data/db.js");
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send('hello')
});

server.get('/now', (req, res) => {
  res.send( new Date());
});

server.get("/users", (req, res) => {
  db
    .find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ message: "error retrieving users" });
    });
});

server.listen(3000, () => {
  console.log(`\n** Up and running on port 3K`);
});
