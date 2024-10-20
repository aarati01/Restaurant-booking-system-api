import bcrypt from "bcrypt";

const saltRounds = 10;

export const encryptPass = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPw = await bcrypt.hash(password, salt);
  return hashedPw;
};

export const comparePass = async (userPw: string, hashedPw: string) => {
  bcrypt.compare(userPw, hashedPw).then((res) => res);
};
