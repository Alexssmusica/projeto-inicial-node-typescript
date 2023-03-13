import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import { AppError } from '../../errors/AppError';
import HttpServer from './HttpServer';
import { Methods } from './types/Types';

export default class ExpressAdapter implements HttpServer {
	private app: Application;

	constructor() {
		this.app = express();
		this.app.use(cors());
		this.app.use(express.json());
		this.app.use((err: Error, _request: Request, response: Response, _next: NextFunction) => {
			if (err) {
				if (err instanceof AppError) {
					return response.status(err.statusCode).json({
						message: err.message
					});
				}
				return response.status(500).json({
					status: 'Error',
					message: `Internal server error ${err.message}`
				});
			}
		});
	}

	route(method: Methods, url: string, callback: Function, status = 200): void {
		this.app[method](url, async function (req: Request, res: Response) {
			try {
				const output = await callback(req.params, req.body);
				res.status(status).json(output);
			} catch (error: any) {
				res.status(error.statusCode).json(error).end();
			}
		});
	}

	listen(port: number): void {
		this.app.listen(port, () => console.log(`🚀 Servidor iniciado na porta ${port}.`));
	}
}
