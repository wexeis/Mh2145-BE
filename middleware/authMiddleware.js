import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Authentication error. Token required.' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Authentication error. Invalid token.' });
  }
};

