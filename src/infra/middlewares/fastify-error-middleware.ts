import type { FastifyReply, FastifyRequest } from 'fastify';
import type { ApiError } from '../helpers/api-erros';

export const fastifyErrorMiddleware = (
	error: Error & Partial<ApiError>,
	_request: FastifyRequest,
	reply: FastifyReply
) => {
	const statusCode = error.statusCode ?? 500;
	const message = error.statusCode ? error.message : 'Internal Server Error';
	reply.status(statusCode).send({ message });
};
