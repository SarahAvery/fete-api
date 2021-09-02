const express = require("express");
const router = express.Router();

module.exports = (db, create, seed) => {
  router.get("/reset", (request, response) => {
    console.log("read");
    console.log("create: ", create);
    console.log("seed: ", seed);
    db.query(create)
      .then(() => {
        db.query(seed);
      })
      .then(() => {
        console.log("Database Reset");
        response.status(200).send("Database Reset");
      });
  });
  return router;
};
