import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { comparePwd } from "../utils/comparePassword.js";

export const userProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userID)
      .select("-password")
      .select("-refreshToken")
      .select("-__v");
    if (!user) {
      return res.status(404).json({ message: "Aucun utilisateur trouvée" });
    }
    res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const userDelProfile = async (req, res) => {
  const userID = req.user.userID;
  const query = User.where({ _id: userID });
  try {
    res.cookie("access_token", "", {
      maxAge: 0,
      // --- Les options suivantes doivent correspondre à la création ! ---
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
    await query.deleteOne();
    return res
      .status(200)
      .json({ message: "Votre compte à été supprimer avec success" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const changePassword = async (req, res) => {
  const userID = req.user.userID;
  const { currentPassword, newPassword } = req.body;
  try {
    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable!" });
    }
    const valide = await comparePwd(currentPassword, user.password);
    if (!valide) {
      return res.status(400).json({ message: "mot de passe incorrect" });
    }

    const newHash = await bcrypt.hash(newPassword, 10);
    await User.updateOne({ _id: userID }, { password: newHash });
    return res.status(201).json({ message: "mot de passe mis à jour" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
