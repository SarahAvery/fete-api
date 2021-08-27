const express = require('express');
const router  = express.Router();

// Get all events for a user
module.exports = (db) => {
  router.get("/users/:user", (req, res) => {
    // http://localhost:8002/api/users/1  < 1 is the user's id
    db.query(`
        SELECT * 
        FROM events
        INNER JOIN users_events
        ON events.id = event_id
        WHERE user_id = $1;`, [req.params.user])
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

// Returns this:
/*
{"users":[{"id":1,"title":"F&G wedding","first_name":"Frank Alistair","second_name":"Georgia Green","event_date_weekday":"Saturday","event_date_day":21,"event_date_month":"August","event_date_year":2022,"email":"fngwedding@email.com","phone_number":"4168261456","unit":"23A","street_number":"145","street_name":"Brooklands","street_type":"Place","postal_code":"M2X 4W9","city":"Cityville","date_created":"2021-08-27T19:51:33.824Z","percentage":null,"user_id":1,"event_id":1},{"id":2,"title":"Lucy & Kate","first_name":"Lucy Watson","second_name":"Kate Lincoln","event_date_weekday":"Friday","event_date_day":3,"event_date_month":"June","event_date_year":2022,"email":"gettingmarried@email.com","phone_number":"4161649826","unit":"Suite 2306","street_number":"4873","street_name":"Astor","street_type":"Drive","postal_code":"L7R 1K8","city":"Townsville","date_created":"2021-08-27T19:51:33.824Z","percentage":null,"user_id":1,"event_id":2}]}
*/