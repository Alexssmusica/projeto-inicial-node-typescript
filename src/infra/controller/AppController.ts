import type HttpServer from '../http/HttpServer';

export default class AppController {
	constructor(readonly httpServer: HttpServer) {
		httpServer.route('get', '/', () => {
			return {
				message: 'Servidor iniciado.'
			};
		});
	}
}
