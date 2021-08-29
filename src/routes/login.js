const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const jwt = require("jsonwebtoken");

module.exports = (db) => {
  router.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.query(`SELECT * FROM users WHERE email = $1;`, [email])
      .then((userData) => {
        // authenticate user
        const userDatabaseData = userData.rows[0];
        const authenticated = bcrypt.compareSync(
          password,
          userDatabaseData.password
        );
        if (authenticated) {
          // Below is for a jwt
          const tokenData = { ...userDatabaseData, password: undefined };
          const accessToken = jwt.sign(
            tokenData,
            process.env.ACCESS_TOKEN_SECRET
          );
          const { id, email, planner_role } = userDatabaseData;
          res.send({ accessToken, id, email, planner_role });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};

// Sends a response: Object { id: 1, email: "email@email.com", planner_role: false, iat: 1630187736 }
