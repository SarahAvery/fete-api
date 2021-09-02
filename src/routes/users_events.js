const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // Get all events for a user
  router.get("/", (req, res) => {
    if (!req.user.id) res.status(404).json({ error: "User id not provided" });

    db.query(
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
          city,
          percentage
        FROM events
        INNER JOIN users_events
        ON events.id = event_id
        WHERE user_id = $1;
        `,
      [req.user.id]
    )
      .then((data) => {
        const events = data.rows;
        // console.log(events);
        res.json(events);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // Add a new event for this user - Will be called by submission of 'add new event' form
  router.post("/add", (req, res) => {
    const values = Object.values(req.body);
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
            (board_id, status, title)
          VALUES
            ((SELECT id FROM board_key), 1, 'To Do'),
            ((SELECT id FROM board_key), 1, 'Follow Up'),
            ((SELECT id FROM board_key), 1, 'Pending Approval'),
            ((SELECT id FROM board_key), 1, 'Approved'),
            ((SELECT id FROM board_key), 1, 'Booked'),
            ((SELECT id FROM board_key), 1, 'Billed'),
            ((SELECT id FROM board_key), 1, 'Paid');
        `,
      values
    )
      .then((status) => {
        console.log("status in API call: ", status);
        res.sendStatus(200);
      })
      .catch((err) => res.status(500).json({ error: err.message }));
  });

  // Delete an event for this user - Will be called by delete option on ellipsis menu of each event displayed on Dashboard
  router.delete("/:eventId/delete", (req, res) => {
    db.query(
      `
      DELETE FROM events WHERE events.id = $1::integer
        `,
      [req.event.id]
    )
      .then((data) => {
        // const events = data.rows;
        // console.log(events);
        // res.json(events);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
