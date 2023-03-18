import { Router } from 'express';
import ShortLinkRouter from './ShortLinkRouter.js';
import UrlRouter from './UrlRouter.js';
import UserRouter from './UserRouter.js';

const RootRouter = Router();

RootRouter.use(UserRouter);
RootRouter.use('/urls', UrlRouter);
RootRouter.use(ShortLinkRouter);

export default RootRouter;
