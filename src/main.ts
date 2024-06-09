// import bodyParser from 'body-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import statusRoute from './routes/statusRoute';
import AppRequestError from './utils/AppRequestError';
import { sendJsonResponse } from './utils/sendJsonResponse';

const port = process.env.PORT || 3000;

const app = express();

app.use(morgan('combined'));

//app.use(bodyParser.json({ limit: '50mb' }));

app.use(cors());

// Sample router
app.use('/api/status/', statusRoute);

// Handle 404
app.use((_req: Request, res: Response) => {
  sendJsonResponse(res, 404);
});

// Error management, MUST have 4 parameters
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error | AppRequestError, _req: Request, res: Response, _next: NextFunction) => {
  let clientHttpStatus = 500;
  let clientMessage;
  if (err instanceof AppRequestError) {
    clientHttpStatus = err.clientHttpStatus || clientHttpStatus;
    clientMessage = err.clientMessage;
  }
  console.error(err);

  sendJsonResponse(res, clientHttpStatus, clientMessage);
});

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Handle KILL signals
function shutDown() {
  console.log('Received kill signal, shutting down gracefully');

  server.close(() => {
    console.log('Closed out remaining connections');
    process.exit(0);
  });

  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 4000);
}

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);
