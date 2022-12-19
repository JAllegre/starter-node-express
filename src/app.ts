import http from 'http';
import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { snakeCase } from 'lodash';
import statusRoute from './routes/statusRoute';
import AppRequestError from './utils/AppRequestError';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use('/api/status/', statusRoute);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Error management, MUST have 4 parameters
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error | AppRequestError, _req: Request, res: Response, _next: NextFunction) => {
  let clientHttpStatus = 500;
  let clientMessage = snakeCase(http.STATUS_CODES[clientHttpStatus]);
  if (err instanceof AppRequestError) {
    clientHttpStatus = err.clientHttpStatus || 500;
    clientMessage = err.clientMessage || snakeCase(http.STATUS_CODES[clientHttpStatus]);
  }
  console.error(err);

  res.status(clientHttpStatus).json({ status: clientHttpStatus, message: clientMessage });
});
