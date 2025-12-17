import bcrypt from "bcrypt";
import User from "../models/User.js";
import { comparePwd } from "../utils/comparePassword.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";
import mongoose from "mongoose";
export const register = async (req, res) => {
  const { fullname, email, password } = req.body;
  const query = User.where({ email });
  try {
    const exists = await query.findOne();
    if (exists) return res.status(400).json({ message: "Email déjà utilisé" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({ ...req.body, password: hashed });
    user.password = null;
    generateAccessToken(res, user._id, fullname);
    res.status(201).json({ user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const query = User.where({ email });
  try {
    const user = await query.findOne();
    if (!user) {
      return res
        .status(400)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    const valid = await comparePwd(password, user.password);
    if (!valid)
      return res
        .status(400)
        .json({ message: "Email ou mot de passe incorrect" }); // 1. Génération et placement des jetons dans les cookies

    generateAccessToken(res, user._id, user.fullname);
    const refresh_token = generateRefreshToken(res, user._id); // 2. Stockage du Refresh Token en base de données
    user.refreshToken = refresh_token;
    await user.save();

    res.status(200).json({ message: "Connecté!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const logout = async (req, res) => {
  const userID = new mongoose.Types.ObjectId(req.user.userID);
  try {
    await User.findOneAndUpdate(
      { _id: userID },
      { refreshToken: null },
      { new: true }
    );
    res.cookie("access_token", "", {
      maxAge: 0,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      path: "/",
    });

    res.cookie("refresh_token", "", {
      maxAge: 0,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      path: "/api/auth/refresh", // Souvent limité à la route de rafraîchissement
    });
    res.status(200).json({ message: "Déconnexion réussie" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const check = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({ message: "Connectée", user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
