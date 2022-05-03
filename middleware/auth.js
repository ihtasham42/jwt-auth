const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(400).send("No token provided");
  }

  try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      
      req.body.userId = decoded;

      return next();
  } catch(err) {
    return res.status(400).json("Invalid token");
  }
}

module.exports = {verifyToken}