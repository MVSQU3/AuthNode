import jwt from "jsonwebtoken";
const isProduction = process.env.NODE_ENV === "production";
export const generateAccessToken = function (res, userID, fullname) {
  const access_token = jwt.sign({ userID, fullname }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("access_token", access_token, {
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
    secure: isProduction,
    sameSite: "Lax",
    path: "/",
  });
  return access_token;
};

export const generateRefreshToken = function (res, userID) {
  const refreshToken = jwt.sign({ userID }, process.env.REFRESH_SECRET, {
    expiresIn: "7d", // Refresh Token long
  });

  const sevenDays = 7 * 24 * 60 * 60 * 1000;
  // 2. Envoyer le Refresh Token par cookie HTTP-Only (durée de 7 jours)
  res.cookie("refresh_token", refreshToken, {
    maxAge: sevenDays,
    httpOnly: true,
    secure: isProduction,
    sameSite: "Lax",
    path: "/api/auth/refresh", // Souvent limité à la route de rafraîchissement
  });

  return refreshToken;
};
