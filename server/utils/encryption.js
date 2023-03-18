import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashPassword = async (password) =>
  bcrypt.hash(password, saltRounds);

export const validatePassword = async (password, hashPass) =>
  bcrypt.compare(password, hashPass);
