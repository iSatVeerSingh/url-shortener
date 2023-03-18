import { Router } from 'express';
import {
  CreateNewShortUrl,
  GetAllUrlsByUser,
} from '../controllers/urlsController.js';
import validateUrl from '../middlewares/urlMiddleware.js';
import { authenticateUser } from '../middlewares/userMiddleware.js';

const UrlRouter = Router();

UrlRouter.use(authenticateUser);
UrlRouter.post('', validateUrl, CreateNewShortUrl);
UrlRouter.get('', GetAllUrlsByUser);

export default UrlRouter;
