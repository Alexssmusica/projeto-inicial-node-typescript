import { Methods } from './types/Types';

export default interface HttpServer {
	route(method: Methods, url: string, callback: Function, status?: number): void;
	listen(port: number): void;
}
