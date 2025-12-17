import { validationResult } from "express-validator";

export const validatorMiddleware = async (req, res, next) => {
  const errors = validationResult(req);

  let errorMsg = [];
  errors.array().map((error) => {
    errorMsg.push(error.msg);
  });
  errorMsg.shift();

  if (!errors.isEmpty()) {
    return res.status(400).json({
      succes: false,
      message: "Erreur de validation des donnée",
      errors: errorMsg,
    });
  }
  next();
};
