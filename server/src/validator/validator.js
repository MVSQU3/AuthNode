import { body } from "express-validator";

export const RegisterV = function () {
  return [
    body("fullname")
      .trim()
      .notEmpty()
      .isString()
      .isLength({ min: 2, max: 24 })
      .withMessage("Veuillez entre un nom valide 2 caractère minimum."),

    body("email")
      .trim()
      .notEmpty()
      .withMessage("L'adresse e-mail est obligatoire.")
      .isEmail()
      .withMessage("L'adresse e-mail est invalide.")
      .isString()
      .withMessage("Vérifiez les informations envoyées."),

    body("password")
      .trim()
      .notEmpty()
      .withMessage("Le mot de passe est obligatoire.")
      .isLength({ min: 6, max: 24 })
      .withMessage("Le mot de passe doit contenir entre 6 et 24 caractères."),
  ];
};

export const LoginV = function () {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("L'adresse e-mail est requise.")
      .isEmail()
      .withMessage("Email invalide.")
      .isString()
      .withMessage("Vérifiez les informations envoyées."),

    body("password")
      .trim()
      .notEmpty()
      .withMessage("Le mot de passe est requis.")
      .isLength({ min: 6, max: 24 })
      .withMessage("Le mot de passe doit contenir entre 6 et 24 caractères."),
  ];
};

export const ChangePasswordV = function () {
  return [
    body("currentPassword")
      .trim()
      .notEmpty()
      .isLength({ min: 6, max: 24 })
      .withMessage("Le mot de passe doit contenir entre 6 et 24 caractères."),
    body("newPassword")
      .trim()
      .notEmpty()
      .isLength({ min: 6, max: 24 })
      .custom(async (value, { req }) => {
        return value !== req.body.currentPassword;
      })
      .withMessage("Le mot de passe doit être différents de l'ancien")
      .withMessage(
        "Le mot de passe doit être différents de l'ancien et contenir entre 6 et 24 caractères."
      ),
  ];
};
