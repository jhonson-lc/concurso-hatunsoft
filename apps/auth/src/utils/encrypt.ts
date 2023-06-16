import bcrypt from "bcryptjs";

const saltRounds = 10;

export const encrypt = (hashPass: string) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(hashPass, salt);
};

export const compare = (hashPass: string, pass: string) => {
  return bcrypt.compareSync(pass, hashPass);
};
