import fastifyCors from '@fastify/cors';
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fastify from 'fastify';
import { fastifyErrorMiddleware } from '../middlewares/fastify-error-middleware';
import type HttpServer from './HttpServer';
import type { Methods } from './types/Types';

export default class FastifyAdapter implements HttpServer {
	private app: FastifyInstance;

	constructor() {
		this.app = fastify();
		this.app.register(fastifyCors);
	}

	route(method: Methods, url: string, callback: Function, status = 200): void {
		this.app[method](url, async (request: FastifyRequest, reply: FastifyReply) => {
			const output = await callback(request.params, request.body);
			if (output) {
				reply.status(status).send(output);
			} else {
				reply.status(status).send();
			}
		});
	}

	listen(port: number): void {
		this.app.setErrorHandler(fastifyErrorMiddleware);
		this.app.listen({ port }, () => {
			console.log(`🚀 Servidor iniciado na porta ${port}.`);
		});
	}
}
