import { Request, Response, NextFunction } from 'express';

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  // Log the error for server-side debugging
  console.error(err);
  const status = err && err.status && typeof err.status === 'number' ? err.status : 500;
  const message = err && err.message ? err.message : 'internal error';
  res.status(status).send({ error: message });
}
