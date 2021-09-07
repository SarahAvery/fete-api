const express = require("express");
const router = express.Router();
// const { recalculateExpenses } = require("../calcExpenses")

module.exports = (db) => {
  // Recalculate the total event expenses each time a task's budget or actual expenses are entered/updated
  const recalculateExpenses = (eventId) => {
    if (!eventId) {
      console.log("error: Event id not provided in recalculateExpenses()");
    }
    db.query(
      `
      SELECT tasks.expense_actual, tasks.expense_budget
      FROM tasks
      RIGHT JOIN swimlanes
      ON swimlane_id = swimlanes.id
      INNER JOIN boards
      ON board_id = boards.id
      WHERE event_id = $1;
      `,
      [eventId]
    )
      .then((result) => {
        let expenseSum = 0;
        result.rows.forEach((obj) => {
          obj.expense_actual > 0
            ? (expenseSum += obj.expense_actual)
            : (expenseSum += obj.expense_budget);
        });
        db.query(`UPDATE events SET expense_actual = $1 WHERE id = $2;`, [
          expenseSum,
          eventId,
        ]);
      })
      .catch((err) => res.status(500).json({ error: err.message }));
  };

  // Add task to db
  router.post("/:eventId/add", async (req, res) => {
    const eventId = req.params.eventId;
    const [
      order,
      columnId,
      status,
      title,
      content,
      expense_budget,
      expense_actual,
    ] = req.body;

    db.query(
      `
    INSERT into tasks(task_order, swimlane_id, status, title, content, expense_budget, expense_actual)
    VALUES ($1, $2, $3, $4, $5, $6, $7);
    `,
      [
        order,
        parseInt(columnId),
        status,
        title,
        content,
        expense_budget,
        expense_actual,
      ]
    )
      .then((tasksData) => {
        recalculateExpenses(eventId);
        res.sendStatus(200);
      })
      .catch((err) => res.status(500).json({ error: err.message }));
  });

  // Update task to db
  router.post("/:eventId/update", async (req, res) => {
    const eventId = req.params.eventId;
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
        recalculateExpenses(eventId);
        res.sendStatus(200);
      })
      .catch((err) => res.status(500).json({ error: err.message }));
  });

  // Delete task to db
  router.post("/:eventId/delete", async (req, res) => {
    const eventId = req.params.eventId;
    const { id } = req.body;

    db.query(`DELETE FROM tasks WHERE id = $1;`, [id])
      .then((tasksData) => {
        recalculateExpenses(eventId);
        res.sendStatus(200);
      })
      .catch((err) => res.status(500).json({ error: err.message }));
  });

  return router;
};
