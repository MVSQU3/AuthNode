import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const access_token = req.cookies.access_token;
  if (!access_token) return res.status(401).json({ message: "Non autorisé" });

  try {
    const decoded = jwt.verify(access_token, process.env.ACCESS_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalide" });
  }
};
