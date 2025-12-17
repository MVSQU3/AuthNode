import User from "../models/User.js";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";

export const refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refresh_token;
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const user = await User.findOne({
      _id: decoded.userID,
      refreshToken: refreshToken,
    });
    if (!user) {
      return res.status(401).json({ message: "Session invalide ou révoquée." });
    }
    generateAccessToken(res, user._id, user.fullname);
    const new_refreshToken = generateRefreshToken(res, user._id);
    user.refreshToken = new_refreshToken;
    await user.save();
    res.status(200).json({ message: "Access Token renouvelé avec succès." });
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Refresh Token invalide ou expiré" });
  }
};
