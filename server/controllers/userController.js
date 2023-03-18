import httpStatus from 'http-status';
import UserModel from '../models/userModel.js';
import sendUserEmail from '../utils/email.js';

import { hashPassword, validatePassword } from '../utils/encryption.js';
import { getSecureToken, verifyJwtToken } from '../utils/jwttoken.js';
import { getErrorResponse, getSuccessResponse } from '../utils/response.js';

export const CreateNewUser = async (req, res) => {
  const { name, email, password } = req.body;

  const hash = await hashPassword(password);

  const user = new UserModel({
    name,
    email,
    password: hash,
  });

  try {
    const { _id, email: userEmail } = await user.save();

    const jwtToken = getSecureToken(_id);

    await sendUserEmail(userEmail, jwtToken, 'signup');

    res
      .status(httpStatus.CREATED)
      .json(getSuccessResponse('Please check your email for verification'));
  } catch (err) {
    res.status(httpStatus.BAD_REQUEST).json(getErrorResponse(err));
  }
};

export const VerifySignupEmail = async (req, res) => {
  const { token } = req.query;

  if (!token) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(getErrorResponse('Invalid verification link or expired'));
    return;
  }

  try {
    const { data: id } = verifyJwtToken(token);

    const { verified } = await UserModel.findById(id, 'verified');

    if (verified) {
      res
        .status(httpStatus.OK)
        .json(getSuccessResponse('Account already verified'));
      return;
    }

    await UserModel.findByIdAndUpdate(id, { verified: true });

    res
      .status(httpStatus.OK)
      .json(getSuccessResponse('Account verified successfully'));
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      res
        .status(httpStatus.BAD_REQUEST)
        .json(getErrorResponse('Invalid verification link or expired'));
      return;
    }

    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(getErrorResponse(err));
  }
};

export const LoginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user.verified) {
      res
        .status(httpStatus.BAD_REQUEST)
        .json(getErrorResponse('Account is not verified'));
      return;
    }

    const isValid = await validatePassword(password, user.password);

    if (!isValid) {
      res
        .status(httpStatus.BAD_REQUEST)
        .json(getErrorResponse('Invalid credentials'));
      return;
    }

    const jwtToken = getSecureToken(user.id);

    res.cookie('token', jwtToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.status(httpStatus.OK).json(getSuccessResponse('Login Success'));
  } catch (err) {
    res.status(httpStatus.BAD_REQUEST).json(getErrorResponse(err));
  }
};
