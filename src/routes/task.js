const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // Add task to db
  router.post("/:eventId/add", async (req, res) => {

    const [order, columnId, status, title, content, expense_budget, expense_actual] = req.body;

    // !!!!! SWIMLANE NEEDS TO BE CHANGED TO COLUMN
    db.query(
      `
    INSERT into tasks(task_order, swimlane_id, status, title, content, expense_budget, expense_actual)
    VALUES ($1, $2, $3, $4, $5, $6, $7);
    `,
      [order, parseInt(columnId), status, title, content, expense_budget, expense_actual]
    )
      .then((tasksData) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // Update task to db
  router.post("/:eventId/update", async (req, res) => {

    const { id, title, content, expense_budget, expense_actual } = req.body;

    db.query(
      `
      UPDATE tasks
        SET title = $1,
        content = $2,
        expense_budget = $4,
        expense_actual = $5
      WHERE id = $3;
    `,
      [title, content, id, expense_budget, expense_actual]
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
