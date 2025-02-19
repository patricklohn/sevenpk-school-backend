import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No Token provider" });
  }

  jwt.verify(token, process.env.SECRET, (error, user) => {
    if (error) {
      return res.status(403).json({ message: "Faleid to authenticate Token" });
    }
    req.user = user;
    next();
  });
};

export default authenticateToken;
