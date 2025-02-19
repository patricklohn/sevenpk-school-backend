import { hash } from "bcrypt";

export const hashPassword = async (password) => {
  const saltRounds = 8;
  const hashedPassword = await hash(password, saltRounds);
  return hashedPassword;
};
