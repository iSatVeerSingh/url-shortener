import httpStatus from 'http-status';
import { verifyJwtToken } from '../utils/jwttoken.js';
import { getErrorResponse } from '../utils/response.js';
import { validateLogin, validateSignup } from '../utils/validate.js';

export const validateSignupMiddleware = (req, res, next) => {
  const { name, email, password } = req.body;

  const isInvalid = validateSignup({ name, email, password });

  if (isInvalid) {
    res.status(httpStatus.BAD_REQUEST).json(getErrorResponse(isInvalid));
    return;
  }
  next();
};

export const validateLoginMiddleware = (req, res, next) => {
  const { email, password } = req.body;

  const isInvalid = validateLogin({ email, password });

  if (isInvalid) {
    res.status(httpStatus.BAD_REQUEST).json(getErrorResponse(isInvalid));
    return;
  }
  next();
};

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    res
      .status(httpStatus.UNAUTHORIZED)
      .json(getErrorResponse('Unauthorized Access'));
    return;
  }

  try {
    const { data: id } = verifyJwtToken(token);

    req.userid = id;

    next();
  } catch (err) {
    res
      .status(httpStatus.UNAUTHORIZED)
      .json(getErrorResponse('Unauthorized Access'));
  }
};
