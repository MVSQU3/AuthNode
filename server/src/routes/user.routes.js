import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  changePassword,
  userDelProfile,
  userProfile,
} from "../controllers/user.controller.js";
import { ChangePasswordV } from "../validator/validator.js";
import { validatorMiddleware } from "../middleware/validator.middleware.js";
const router = express.Router();

router.get("/profile", authMiddleware, userProfile);
router.delete("/delete/profile", authMiddleware, userDelProfile);
router.put(
  "/change-password",
  authMiddleware,
  ChangePasswordV(),
  validatorMiddleware,
  changePassword
);
export default router;
