const express = require("express");
const router = express.Router();

// Get all data for a specific board
module.exports = (db) => {
  router.get("/:eventId", async (req, res) => {
    try {
      const tasksData = await db.query(
        `
        SELECT 
        swimlanes.id,
        swimlanes.title,
        JSON_AGG( 
          json_build_object(
            'id', tasks.id, 
            'title', tasks.title, 
            'content', tasks.content,
            'order', tasks.task_order
          )
        ) AS items
        FROM tasks
        INNER JOIN swimlanes
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
        items: tasksData.rows
      });
    } catch (err) {
      res.sendStatus(500).json({ error: err.message });
    }
  });

  router.post("/:eventId/update", async (req, res) => {
    // console.log(req.body, req.params, req.query);

    const queries =
      req.body &&
      !!req.body.length &&
      req.body.map((swimlane) => {
        return swimlane.items.map((task) => {
          return db.query(`UPDATE tasks SET task_order = $1 WHERE id = $2;`, [
            task.order,
            task.id
          ]);
        });
      });

    try {
      const tasksData = await Promise.all(queries.flat());
      // tasksData.forEach((prom) => console.log(prom));

      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500).json({ error: err.message });
    }
  });

  // Add task to db
  router.post("/:eventId/add", async (req, res) => {
    console.log(req.body, req.params, req.query);
    /*
     * api recieves an array.
     * [3, 0, 1, 'fd', 'dgd' ] { eventId: '1' }
     * req.body = [task_order, columnId, status(always 1), title, content], req.params = {eventID: '1'}
     */

    const [order, columnId, status, title, content] = req.body;

    // !!!!! SWIMLANE NEEDS TO BE CHANGED TO COLUMN
    db.query(
      `
    INSERT into tasks(task_order, swimlane_id, status, title, content)
    VALUES ($1, $2, $3, $4, $5)
    `,
      [order, parseInt(columnId), status, title, content]
    )
      .then((tasksData) => {
        // const task = tasksData.rows[0];
        // console.log(task);
        // res.json(task);
        res.sendStatus(200);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
