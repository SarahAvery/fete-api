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
        console.log(events);
        res.json(events);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });


  // Add a new event for this user - Will be called by submission of 'add new event' form
  router.put("/:userId/add", (req, res) => {
    if (!req.user.id) res.status(404).json({ error: "User id not provided" });

    // Double check values and order from client-side
    const values = Object.values(req.body)

    db.query(
      `
      INSERT INTO events (title, first_name, second_name, event_date, email, phone, unit, street_number, street_name, street_type, postal_code, city)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *;
        `,
      values
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
