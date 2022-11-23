import pgp from 'pg-promise';
import Env from '../util/Env';
import Connection from './Connection';

export default class PgPromiseConnection implements Connection {
	private connection: pgp.IDatabase<any>;

	constructor() {
		this.connection = pgp()({
			connectionString: Env.variable.URL_DATABASE
		});
	}

	query(statement: string, params: any): Promise<any> {
		return this.connection.query(statement, params);
	}

	close(): Promise<void> {
		return this.connection.$pool.end();
	}
}