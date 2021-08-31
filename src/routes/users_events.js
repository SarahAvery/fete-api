const express = require("express");
const router = express.Router();

// Get all events for a user
module.exports = (db) => {
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
  return router;
};
