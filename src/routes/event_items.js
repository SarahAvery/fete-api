const express = require('express');
const router  = express.Router();

// Get all to-do items for a specific event
module.exports = (db) => {
  router.get("/", (req, res) => {
    // shortcut since currently all to-do items are for the same event
    db.query(`SELECT * FROM do_item;`)
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

