const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // Update task to db
  router.post("/:eventId/update", async (req, res) => {
    console.log(req.body, req.params, req.query);

    const { id, title, content } = req.body;

    db.query(
      `
      UPDATE tasks
      SET title = $1, content = $2
      WHERE id = $3;
    `,
      [title, content, id]
    )
      .then((tasksData) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // Delete task to db
  router.post("/:eventId/delete", async (req, res) => {
    console.log(req.body, req.params, req.query);

    const { id } = req.body;

    db.query(
      `
      DELETE FROM tasks
      
      WHERE id = $1;
    `,
      [id]
    )
      .then((tasksData) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
