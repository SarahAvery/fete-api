const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const jwt = require("jsonwebtoken");

module.exports = (db) => {
  router.post("/register", (req, res) => {
    const newUser = req.body;
    newUser.password = bcrypt.hashSync(newUser.password, salt);
    newUser.planner_role = true;
    const values = Object.values(newUser);

    // check if email already exists in database:
    db.query(`SELECT * FROM users WHERE email = $1;`, [newUser.email])
      .then((response) => {
        if (response.rows[0]) {
          return res.status(403).json({ error: "user already exists" });
        }
      })
      .catch((err) => {
        return res.status(500).json({ error: err.message });
      });

    // if user doesn't exist, and them:
    db.query(
      `
      INSERT INTO users (email, password, planner_role)
      VALUES($1, $2, $3)
      RETURNING *;
      `,
      values
    )
      .then((res) => res.rows)
      .catch((err) => console.error("query error", err.stack))
      .then((user) => {
        if (!user) {
          res.send({ error: "error" });
          return;
        }
        // add the user id from the register query to the newUser so it becomes part of the token data
        newUser.id = user[0].id;
        console.log("newUser back-end: ", newUser, user[0]);

        // set jwt token:
        const tokenData = { ...newUser, password: undefined };
        const accessToken = jwt.sign(
          tokenData,
          process.env.ACCESS_TOKEN_SECRET
        );
        res.send({ accessToken: accessToken });
      });
  });
  return router;
};
