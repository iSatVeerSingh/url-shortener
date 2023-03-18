import httpStatus from 'http-status';
import { getErrorResponse } from '../utils/response.js';

const validateUrl = (req, res, next) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(getErrorResponse('Please provide a url'));
    return;
  }

  const urlPattern = originalUrl.includes('www')
    ? /^(ftp|https?):\/\/w{3}\.[a-z.-]+\.[a-z]+(:[0-9]+)*\/?\S*/
    : /^(ftp|https?):\/\/(?!www\.)[a-z.-]+\.[a-z]+(:[0-9]+)*\/?\S*/;

  const isValid = urlPattern.test(originalUrl);

  if (!isValid) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(getErrorResponse('Please provide a valid url'));
    return;
  }
  next();
};

export default validateUrl;
