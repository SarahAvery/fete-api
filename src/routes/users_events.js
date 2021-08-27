const express = require('express');
const router  = express.Router();

// Get all events for a user
module.exports = (db) => {
  router.get("/", (req, res) => {
    // shortcut straight to events table since only 1 event currently exists
    db.query(`SELECT * FROM events;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
