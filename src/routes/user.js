const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/me", (req, res) => {
    // req.user.id comes from the validate-token middleware
    if (!req.user.id) res.status(404).json({ error: "User id not provided" });

    db.query(
      `
        SELECT id, email, planner_role 
        FROM users
        WHERE id = $1;
        `,
      [req.user.id]
    )
      .then((data) => {
        const user = data.rows[0];
        res.json(user);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
