import { Router } from 'express';
import {
  GetUrlByUrlId,
  RedirectToOriginalUrl,
  SendClickVerification,
} from '../controllers/urlsController.js';

const ShortLinkRouter = Router();

ShortLinkRouter.route('/:urlId').get(GetUrlByUrlId).post(SendClickVerification);
ShortLinkRouter.get('/:urlId/verify', RedirectToOriginalUrl);

export default ShortLinkRouter;
