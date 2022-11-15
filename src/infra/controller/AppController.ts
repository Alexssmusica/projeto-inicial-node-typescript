import HttpServer from '../http/HttpServer';

export default class AppController {
	constructor(readonly httpServer: HttpServer) {
		httpServer.route('get', '/', function () {
			const output = {
				message: 'Servidor iniciado.'
			};
			return output;
		});
	}
}
