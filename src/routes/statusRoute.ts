import express, { Request, Response } from 'express';
import { sendJsonResponse } from '../utils/sendJsonResponse';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  sendJsonResponse(res, 200);
});

export default router;
