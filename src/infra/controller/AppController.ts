import AppService from '../../service/AppService';
import type HttpServer from '../http/HttpServer';

export default class AppController {
	constructor(readonly httpServer: HttpServer) {
		httpServer.route('get', '/', () => {
			const appService = new AppService();
			return {
				message: appService.execute()
			};
		});
	}
}
