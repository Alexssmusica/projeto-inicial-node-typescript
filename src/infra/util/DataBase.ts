import { types } from 'pg';
class DataBase {
	setPostgresTypes(): void {
		types.setTypeParser(types.builtins.INT2, function (val: any) {
			return parseInt(val);
		});
		types.setTypeParser(types.builtins.INT4, function (val: any) {
			return parseInt(val);
		});
		types.setTypeParser(types.builtins.INT8, function (val: any) {
			return parseInt(val);
		});
		types.setTypeParser(types.builtins.NUMERIC, function (val: any) {
			return parseFloat(val);
		});
	}
}

export const setPostgresTypes = new DataBase().setPostgresTypes;
