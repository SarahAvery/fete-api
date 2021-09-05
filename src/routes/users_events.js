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
          expense_budget,
          expense_actual,
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
        res.json(events);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // Add a new event for this user - Will be called by submission of 'add new event' form
  router.post("/add", (req, res) => {
    const values = Object.values(req.body);
    console.log('values in users_events: ', values)
    // $14 is the userId
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
            city,
            expense_budget)
          VALUES
            ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) 
          RETURNING id),   
        users_events_key AS
          (INSERT INTO users_events 
            (user_id, event_id)
          VALUES 
            ($14, (SELECT id FROM events_key))
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
        res.sendStatus(200);
      })
      .catch((err) => res.status(500).json({ error: err.message }));
  });


  // Update an event for this user
  router.post("/:eventId/update", async (req, res) => {
    const values = Object.values(req.body.data);
    // console.log('values before push: ', values)
    values.push(req.body.event)
    // console.log('values after push: ', values)
    
    // $14 is the event.id
    db.query(
      `UPDATE events SET 
        title           = $1,
        first_name      = $2,
        second_name     = $3,
        event_date      = $4,
        email           = $5,
        phone           = $6,
        unit            = $7,
        street_number   = $8,
        street_name     = $9,
        street_type     = $10,
        postal_code     = $11,
        city            = $12,
        expense_budget  = $13
      WHERE id = $14;`,
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
