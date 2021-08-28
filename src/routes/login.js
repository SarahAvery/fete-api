const express = require("express");
const router = express.Router();

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const jwt = require('jsonwebtoken')



module.exports = (db) => {
  router.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.query(`SELECT * FROM users WHERE email = $1;`, [email])
      .then((userData) => {
        // authenticate user
        const userDatabaseData = userData.rows[0]
        const authenticated = bcrypt.compareSync(password, userDatabaseData.password)

        if (authenticated) {
          // const token = { token: "test123" }
          // res.send(token)

          // Below is for a jwt
          const tokenData = { ...userDatabaseData, password: undefined }
          const accessToken = jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET)
          
          res.send({ accessToken: accessToken })

        }
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};

// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization']
//   const token = authHeader && authHeader.split(' ')[1]
//   if (token == null) return res.sendStatus(401)

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, tokenData) => {
//     if (err) return res.sendStatus(403)
//     req.user = tokenData
//     next()
//   })
// }

// Sends a response: {"token":"test123"}
