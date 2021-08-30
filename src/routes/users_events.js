const express = require("express");
const router = express.Router();

// Get all events for a user
module.exports = (db) => {
  router.get("/users/:user", (req, res) => {
    // http://localhost:8002/api/users/1  < 1 is the user's id
    db.query(
      `
        SELECT 
        events.id AS id,
        title AS title,
        first_name AS first_name,
        second_name AS second_name,
        event_date_weekday AS weekday,
        event_date_month AS month,
        event_date_day AS day,
        event_date_year AS year,
        email AS email,
        phone_number AS phone, 
        unit AS unit,
        street_number AS street_number,
        street_name AS street_name,
        street_type AS type,
        postal_code AS postal,
        city AS city,
        percentage AS percent 
        FROM events
        INNER JOIN users_events
        ON events.id = event_id
        WHERE user_id = $1;
        `,
      [req.params.user]
    )
      .then((data) => {
        const events = data.rows;
        res.json(events);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};

// Returns this:
/*
[{"id":1,"title":"F&G wedding","first_name":"Frank Alistair","second_name":"Georgia Green","weekday":"Saturday","month":"August","day":21,"year":2022,"email":"fngwedding@email.com","phone":"4168261456","unit":"23A","street_number":"145","street_name":"Brooklands","type":"Place","postal":"M2X 4W9","city":"Cityville","percent":null},{"id":2,"title":"Lucy & Kate","first_name":"Lucy Watson","second_name":"Kate Lincoln","weekday":"Friday","month":"June","day":3,"year":2022,"email":"gettingmarried@email.com","phone":"4161649826","unit":"Suite 2306","street_number":"4873","street_name":"Astor","type":"Drive","postal":"L7R 1K8","city":"Townsville","percent":null}]
*/
