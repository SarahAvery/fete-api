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
      res.status(500).json({ error: err.message });
    }
  });

  router.post("/:eventId/update", async (req, res) => {
    console.log(req.body, req.params, req.query);

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
      tasksData.forEach((prom) => console.log(prom));

      // res.json({
      //   title: eventData.rows[0].title,
      //   items: tasksData.rows
      // });
      res.send(200);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};

// Returns this:
/*
[{"swim_id":1,"swim_title":"To Do","items":[{"item_id":1,"item_title":"Choose Flowers","item_content":"Floras Flowers"},{"item_id":2,"item_title":"Buy Dress","item_content":"Dress Barn - 123 Discount Wedding Way, Brantford"},{"item_id":3,"item_title":"Call Grandma","item_content":"Tell her not to die before the big day"}]},{"swim_id":2,"swim_title":"Follow Up","items":[{"item_id":4,"item_title":"Confirm with bridesmaids","item_content":"Make sure they all accept"},{"item_id":5,"item_title":"Confirm Photographer","item_content":"Marianne Rothbauer"}]},{"swim_id":3,"swim_title":"Pending Approval","items":[{"item_id":6,"item_title":"Venue Booking","item_content":"The Country House Hotel"}]},{"swim_id":4,"swim_title":"Approved","items":[{"item_id":7,"item_title":"Invitations","item_content":"Design and cost"}]},{"swim_id":5,"swim_title":"Booked","items":[{"item_id":8,"item_title":"DJ","item_content":"The Beatmeister Wedding DJ - 416-459-3579"}]},{"swim_id":7,"swim_title":"Paid","items":[{"item_id":9,"item_title":"Deposit for rings","item_content":"Vaughan Vintage and Specialty Jewellery"}]}]
*/
