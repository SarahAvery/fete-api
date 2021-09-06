const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // Get all data for a specific board
  router.get("/:eventId", async (req, res) => {
    try {
      const tasksData = await db.query(
        `
        SELECT 
        swimlanes.id,
        swimlanes.title,
        JSON_AGG( 
          CASE WHEN tasks.id IS NULL
          THEN 'null'
          ELSE
            json_build_object(
                'id', tasks.id, 
                'title', tasks.title, 
                'content', tasks.content,
                'order', tasks.task_order,
                'expense_budget', tasks.expense_budget,
                'expense_actual', tasks.expense_actual
              )
            END
        )AS items
        FROM tasks
        RIGHT JOIN swimlanes
        ON swimlane_id = swimlanes.id
        INNER JOIN boards
        ON board_id = boards.id
        WHERE event_id = $1
        GROUP BY swimlanes.id, swimlanes.title
        ORDER BY swimlanes.id;
        `,
        [req.params.eventId]
      );
      const eventData = await db.query(
        `SELECT title FROM events WHERE id = $1;`,
        [req.params.eventId]
      );

      res.json({
        title: eventData.rows[0].title,
        items: tasksData.rows,
      });
    } catch (err) {
      res.sendStatus(500).json({ error: err.message });
    }
  });

  // Update the Order and Column that the Task is now in
  router.post("/:eventId/update", async (req, res) => {
    const queries =
      req.body &&
      !!req.body.length &&
      req.body.map((swimlane) => {
        return swimlane.items.map((task) => {
          return db.query(
            `UPDATE tasks SET task_order = $1, swimlane_id = $2 WHERE id = $3;`,
            [task.order, task.columnId, task.id]
          );
        });
      });

    try {
      const tasksData = await Promise.all(queries.flat());

      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500).json({ error: err.message });
    }
  });

  // Update Column Name
  router.post("/:eventId/updateCol", async (req, res) => {
    const { id, title } = req.body;

    db.query(
      `
      UPDATE swimlanes
      SET title = $1
      WHERE id = $2
    ;`,
      [title, id]
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
