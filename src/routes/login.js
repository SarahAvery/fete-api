const express = require("express");
const router = express.Router();



module.exports = (db) => {

  router.post('/login', (req, res) => {
    const {email, password} = req.body;
    // console.log('email: ', email)
    // console.log('password: ', password)

    db.query(`SELECT * FROM users WHERE email = $1;`, [email])
      .then(userData => {
        // authenticate user
        console.log('userData.rows: ', userData.rows)
      })
      .then(res.send({ token: 'test123' }))
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;

};

// Sends a response: {"token":"test123"} 

