import httpStatus from 'http-status';
import ShortUrlModel from '../models/urlDataModel.js';
import UserModel from '../models/userModel.js';
import sendUserEmail from '../utils/email.js';
import { getSecureToken, verifyJwtToken } from '../utils/jwttoken.js';
import { getErrorResponse, getSuccessResponse } from '../utils/response.js';
import { validateClickData } from '../utils/validate.js';

export const CreateNewShortUrl = async (req, res) => {
  const { originalUrl } = req.body;

  const createdBy = req.userid;
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  const shortUrlDoc = new ShortUrlModel({
    createdBy,
    originalUrl,
    expiresAt,
  });

  try {
    const { shortUrl } = await shortUrlDoc.save();

    const { HOST } = process.env;

    const url = `http://${HOST}/${shortUrl}`;

    res.status(httpStatus.CREATED).json(getSuccessResponse({ shortUrl: url }));
  } catch (err) {
    res.status(httpStatus.BAD_REQUEST).json(getErrorResponse(err));
  }
};

export const GetAllUrlsByUser = async (req, res) => {
  const { userid } = req;

  try {
    const result = await ShortUrlModel.find(
      { createdBy: userid },
      { originalUrl: 1, shortUrl: 1, expiresAt: 1 },
    );

    res.status(httpStatus.OK).json(getSuccessResponse(result));
  } catch (err) {
    res.status(httpStatus.BAD_REQUEST).json(getErrorResponse(err));
  }
};

export const GetUrlByUrlId = async (req, res) => {
  const { urlId } = req.params;

  try {
    const urlData = await ShortUrlModel.findOne(
      { shortUrl: urlId },
      { shortUrl: 1 },
    );

    if (!urlData) {
      res
        .status(httpStatus.BAD_REQUEST)
        .json(getErrorResponse('The link is invalid or has expired'));
      return;
    }

    res.status(httpStatus.OK).json(getSuccessResponse(urlData));
  } catch (err) {
    res.status(httpStatus.BAD_REQUEST).json(getErrorResponse(err));
  }
};

export const SendClickVerification = async (req, res) => {
  const { name, email } = req.body;
  const { urlId } = req.params;

  const isInvalid = validateClickData({ name, email });

  if (isInvalid) {
    res.status(httpStatus.BAD_REQUEST).json(getErrorResponse(isInvalid));
    return;
  }

  try {
    const jwtToken = getSecureToken({ name, email, urlId });

    await sendUserEmail(email, { urlId, jwtToken }, 'clickVerification');

    res
      .status(httpStatus.CREATED)
      .json(
        getSuccessResponse(
          'Please check your email to verify your click verification',
        ),
      );
  } catch (err) {
    res.status(httpStatus.BAD_REQUEST).json(getErrorResponse(err));
  }
};

export const RedirectToOriginalUrl = async (req, res) => {
  const { token } = req.query;

  try {
    const {
      data: { name, urlId },
    } = verifyJwtToken(token);

    const urlData = await ShortUrlModel.findOne({ shortUrl: urlId });

    if (!urlData) {
      res.status(httpStatus.BAD_REQUEST).json(getErrorResponse('Invalid link'));
      return;
    }

    const user = await UserModel.findById(urlData.createdBy, { email: 1 });
    await sendUserEmail(user.email, { name }, 'linkClick');

    res.status(httpStatus.OK).json(getSuccessResponse(urlData.originalUrl));
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      res
        .status(httpStatus.BAD_REQUEST)
        .json(getErrorResponse('Invalid link or expired'));
      return;
    }

    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(getErrorResponse(err));
  }
};
