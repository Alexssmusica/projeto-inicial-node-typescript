/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextFunction, Request, Response } from 'express';
import type { ApiError } from '../helpers/api-erros';

export const expressErrorMiddleware = (
	error: Error & Partial<ApiError>,
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
	const statusCode = error.statusCode ?? 500;
	const message = error.statusCode ? error.message : 'Internal Server Error';
	return res.status(statusCode).json({ message });
};
