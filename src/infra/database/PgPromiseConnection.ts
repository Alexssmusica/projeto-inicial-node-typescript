import type { IDatabase } from 'pg-promise';
import pgp from 'pg-promise';
import type { IClient } from 'pg-promise/typescript/pg-subset';
import Env from '../helpers/Env';
import type Connection from './Connection';

export default class PgPromiseConnection implements Connection {
	private connection: IDatabase<object, IClient>;

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
