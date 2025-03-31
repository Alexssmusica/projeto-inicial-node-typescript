import pg from 'pg';
class DataBase {
	setPostgresTypes(): void {
		pg.types.setTypeParser(pg.types.builtins.INT2, function (val: string) {
			return parseInt(val);
		});
		pg.types.setTypeParser(pg.types.builtins.INT4, function (val: string) {
			return parseInt(val);
		});
		pg.types.setTypeParser(pg.types.builtins.INT8, function (val: string) {
			return parseInt(val);
		});
		pg.types.setTypeParser(pg.types.builtins.NUMERIC, function (val: string) {
			return parseFloat(val);
		});
	}
}

export const setPostgresTypes = () => new DataBase().setPostgresTypes();
