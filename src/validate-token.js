const jwt = require("jsonwebtoken");

// middleware to validate token
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"]; // 'Authorization: Bearer eyJraWQiOi...'

  if (!bearerHeader) {
    // Forbidden
    res.status(401).json({ error: "Access denied" });
  }

  const bearer = bearerHeader.split(" "); // 'Bearer eyJraWQiOi...'
  const bearerToken = bearer[1];

  try {
    const verified = jwt.verify(bearerToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = verified;
    // console.log("req.user: ", req.user);
    next();
  } catch (err) {
    res.status(401).json({ error: "Token is not valid" });

    // if we had resource permissions, would check here
    // 200 or 403 unauthorized
  }
};

module.exports = verifyToken;
