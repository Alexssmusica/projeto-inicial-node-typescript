import pgp from 'pg-promise';
import Env from '../util/Env';
import Connection from './Connection';

export default class PgPromiseConnection implements Connection {
	private connection: pgp.IDatabase<any>;

	constructor() {
		this.connection = pgp({
			query(e) {
				console.log(e.query);
			}
		})({
			connectionString: Env.variable.URL_DATABASE
		});
	}

	query<T = any>(statement: string, params: any[]): Promise<T> {
		return this.connection.query(statement, params);
	}

	close(): Promise<void> {
		return this.connection.$pool.end();
	}
}
