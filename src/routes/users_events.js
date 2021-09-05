const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // Get all events for a user
  router.get("/", async (req, res) => {
    if (!req.user.id) res.status(404).json({ error: "User id not provided" });

    try {
      const eventsQuery = await db.query(
        `
        SELECT 
          events.id AS event_id,
          title,
          first_name,
          second_name,
          event_date,
          email,
          phone, 
          unit,
          street_number,
          street_name,
          street_type,
          postal_code,
          city
        FROM events
        INNER JOIN users_events
        ON events.id = event_id
        WHERE user_id = $1;
        `,
        [req.user.id]
      );
      const eventsData = await eventsQuery.rows;
      const totalTasksPerEvent = await Promise.all(
        eventsData.map((event) =>
          db.query(
            `
            SELECT count(tasks) AS total_tasks
            FROM tasks
            RIGHT JOIN swimlanes
            ON swimlane_id = swimlanes.id
            INNER JOIN boards
            ON board_id = boards.id
            WHERE event_id = $1;
            `,
            [event.event_id]
          )
        )
      );
      const eventsWithTotalTasks = eventsData.map((event, index) => {
        event.total_tasks = totalTasksPerEvent[index].rows[0].total_tasks;
        return event;
      });

      const finalEvents = await eventsWithTotalTasks.map(async (event) => {
        const completedTasksQuery = await db.query(
          `
            SELECT count(tasks) AS completed_tasks
            FROM tasks
            RIGHT JOIN swimlanes
            ON swimlane_id = swimlanes.id
            INNER JOIN boards
            ON board_id = boards.id
            WHERE event_id = $1 and swimlanes.is_last = true;`,
          [event.event_id]
        );

        event.completed_tasks = completedTasksQuery.rows[0].completed_tasks;
        return event;
      });
      const finalEventsData = await Promise.all(finalEvents);

      res.json(finalEventsData);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Total tasks count
  //   SELECT count(tasks) AS num_of_tasks
  // FROM tasks
  // RIGHT JOIN swimlanes
  // ON swimlane_id = swimlanes.id
  // INNER JOIN boards
  // ON board_id = boards.id
  // WHERE event_id = $1

  // Total completed tasks
  //   SELECT count(tasks) AS num_of_tasks
  //  FROM tasks
  //  RIGHT JOIN swimlanes
  //  ON swimlane_id = swimlanes.id
  //  INNER JOIN boards
  //  ON board_id = boards.id
  // WHERE event_id = $1 and swimlanes.is_last = true

  // Add a new event for this user - Will be called by submission of 'add new event' form
  router.post("/add", (req, res) => {
    console.log(req.body);
    const values = Object.values(req.body);
    // values.unit = req.body.unit || null;
    console.log("values ", values);
    // $13 is the userId
    db.query(
      `
      WITH 
        events_key AS
          (INSERT INTO events 
            (title,
            first_name,
            second_name,
            event_date,
            email,
            phone,
            unit,
            street_number,
            street_name,
            street_type,
            postal_code,
            city)
          VALUES
            ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) 
          RETURNING id),   
        users_events_key AS
          (INSERT INTO users_events 
            (user_id, event_id)
          VALUES 
            ($13, (SELECT id FROM events_key))
          RETURNING id),
        board_key AS
          (INSERT INTO boards 
            (event_id, title)
          VALUES 
            ((SELECT id FROM events_key), $1)
          RETURNING id)  
          INSERT INTO swimlanes 
            (board_id, status, title, is_last)
          VALUES
            ((SELECT id FROM board_key), 1, 'To Do', DEFAULT),
            ((SELECT id FROM board_key), 1, 'Follow Up', DEFAULT),
            ((SELECT id FROM board_key), 1, 'Pending Approval', DEFAULT),
            ((SELECT id FROM board_key), 1, 'Approved', DEFAULT),
            ((SELECT id FROM board_key), 1, 'Booked', DEFAULT),
            ((SELECT id FROM board_key), 1, 'Billed', DEFAULT),
            ((SELECT id FROM board_key), 1, 'Complete', TRUE);
        `,
      values
    )
      .then((status) => {
        res.sendStatus(200);
      })
      .catch((err) => res.status(500).json({ error: err.message }));
  });

  // Update an event for this user
  router.post("/:eventId/update", async (req, res) => {
    const values = Object.values(req.body.data);
    values.push(req.body.event);

    // $13 is the event.id
    db.query(
      `UPDATE events SET 
        title         = $1,
        first_name    = $2,
        second_name   = $3,
        event_date    = $4,
        email         = $5,
        phone         = $6,
        unit          = $7,
        street_number = $8,
        street_name   = $9,
        street_type   = $10,
        postal_code   = $11,
        city          = $12
      WHERE id = $13;`,
      values
    )
      .then((status) => {
        res.sendStatus(200);
      })
      .catch((err) => res.status(500).json({ error: err.message }));
  });

  // Delete an event for this user - Will be called by delete option on ellipsis menu of each event displayed on Dashboard
  router.post("/:eventId/delete", (req, res) => {
    db.query(
      `
      DELETE FROM events WHERE events.id = $1::integer;
        `,
      [req.body.id]
    )
      .then((data) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
