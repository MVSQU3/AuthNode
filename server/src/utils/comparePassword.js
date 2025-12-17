import bcrypt from "bcrypt";

export const comparePwd = async (password, passwordHash) => {
  const valide = await bcrypt.compare(password, passwordHash);
  return valide;
};
