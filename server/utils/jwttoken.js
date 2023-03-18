import jwt from 'jsonwebtoken';

export const getSecureToken = (data) => {
  const { JWT_SECRET } = process.env;

  const token = jwt.sign({ data }, JWT_SECRET, {
    expiresIn: '1d',
  });

  return token;
};

export const verifyJwtToken = (token) => {
  const { JWT_SECRET } = process.env;

  const result = jwt.verify(token, JWT_SECRET);

  return result;
};
