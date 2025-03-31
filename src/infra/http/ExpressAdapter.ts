import cors from 'cors';
import type { Application, NextFunction, Request, Response } from 'express';
import express from 'express';
import { expressErrorMiddleware } from '../middlewares/express-error-middleware';
import type HttpServer from './HttpServer';
import type { Methods } from './types/Types';

export default class ExpressAdapter implements HttpServer {
	private app: Application;

	constructor() {
		this.app = express();
		this.app.use(cors());
		this.app.use(express.json());
	}

	route(method: Methods, url: string, callback: Function, status = 200): void {
		this.app[method](url, async function (req: Request, res: Response, next: NextFunction) {
			try {
				const output = await callback(req.params, req.body);
				res.status(status).json(output);
			} catch (error) {
				next(error);
			}
		});
	}

	setupErrorHandler(): void {
		this.app.use(expressErrorMiddleware);
	}

	listen(port: number): void {
		this.app.listen(port, () => console.log(`🚀 Servidor iniciado na porta ${port}.`));
	}
}
