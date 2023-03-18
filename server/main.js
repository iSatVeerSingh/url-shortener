import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import dbConnection from './utils/dbConnection.js';
import RootRouter from './routes/RootRouter.js';
import path from 'path';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));
app.use(cookieParser());
app.use(cors());

dbConnection();

app.use(express.static(path.resolve('./dist')));

app.use(
  '/api',
  RootRouter
);

app.get(
  '*',
  (req, res) => {

    res.sendFile(path.resolve('./dist/index.html'));

  }
);

const {PORT} = process.env || 8000;

app.listen(
  PORT,
  () => console.log(
    'Server is listening on port: ',
    PORT
  )
);
