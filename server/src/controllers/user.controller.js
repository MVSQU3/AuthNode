import bcrypt from "bcrypt";
import User from "../models/User.js";
import { comparePwd } from "../utils/comparePassword.js";
import { generateResetToken } from "../utils/generateToken.js";
import jwt from "jsonwebtoken";
import transporter from "../config/nodemailer.js";
import { mailOptionFunc } from "../utils/mailOption.js";

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

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const query = User.where({ email });
  try {
    const user = await query.findOne();
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Utilisateur non trouver" });
    }
    const { hashResetToken, resetToken } = await generateResetToken(user.email);
    user.resetToken = hashResetToken;
    const resetUrl = `${process.env.CLIENT_URL}/reset-password-confirm/${resetToken}`;
    await user.save();
    const mailOption = mailOptionFunc(user.email, resetUrl);
    try {
      await transporter.sendMail(mailOption);
      return res.status(200).json({
        success: true,
        message: "Un email a été envoyé a votre address mail!",
      });
    } catch (error) {
      // ÉCHEC de l'envoi : On applique l'Option A 🔄
      user.resetToken = null;
      await user.save();

      return res.status(500).json({
        success: false,
        message: "Erreur lors de l'envoi de l'email. Veuillez réessayer.",
      });
    }
    // return res.status(200).json({ success: true, resetToken });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */

export const resetPasswordConfirm = async (req, res) => {
  const { token } = req.params;
  const { newPassword, confirmPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.RESET_SECRET);
    const email = decoded.email;
    const query = User.where({ email });
    const user = await query.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Utilisateur non trouver" });
    }
    const isGoodTokenHash = await bcrypt.compare(token, user.resetToken);
    if (!isGoodTokenHash) {
      return res.status(401).json({ success: false, message: "Unauthorize" });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Les mots de passe ne sont pas identique",
      });
    }
    const hash = await bcrypt.hash(newPassword, 10);
    user.password = hash;
    user.resetToken = null;
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Mot de passe réinitialiser" });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Le lien a expiré" });
    }
    if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ message: "Lien de réinitialisation invalide" });
    }
    return res
      .status(500)
      .json({ message: "Erreur serveur", error: error.message });
  }
};
