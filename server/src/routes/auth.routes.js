import express from "express";
import {
  register,
  login,
  check,
  logout,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { validatorMiddleware } from "../middleware/validator.middleware.js";
import { refreshToken } from "../controllers/refresh.controller.js";
import { LoginV, RegisterV } from "../validator/validator.js";

const router = express.Router();

router.post("/register/", RegisterV(), validatorMiddleware, register);
router.post("/login/", LoginV(), validatorMiddleware, login);
router.post("/logout/", authMiddleware, logout);
router.get("/check/", authMiddleware, check);
router.post("/refresh/", authMiddleware, refreshToken);
export default router;
