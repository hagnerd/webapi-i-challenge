const express = require("express");

const db = require("./data/db");

const server = express();

server.use(express.json());

server.listen(4000, () => {
  console.log(`The server is listening on port 4000`);
});
