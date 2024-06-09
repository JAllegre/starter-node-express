import { Response } from 'express';
import http from 'http';
import { snakeCase } from 'lodash';

export function sendJsonResponse(
  res: Response,
  clientHttpStatus: number,
  clientMessage?: string,
  data?: Record<string, any>
): void {
  res.status(clientHttpStatus).json({
    status: clientHttpStatus,
    message: clientMessage || snakeCase(http.STATUS_CODES[clientHttpStatus]),
    ...(data || {})
  });
}
