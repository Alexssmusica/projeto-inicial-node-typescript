import * as dotEnv from 'dotenv';

dotEnv.config({
	path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

export default abstract class Env {
	private static getEnv(varName: string, required = true): string | undefined {
		const envVar = process.env[varName];

		if (envVar) {
			return String(envVar);
		} else {
			if (required) {
				const erro = `Necessário criar variável ${varName} no arquivo .env`;
				throw new Error(erro);
			}

			return undefined;
		}
	}

	private static getEnvString(varName: string, required = true): string {
		const valor = this.getEnv(varName, required);
		return valor ? valor.trim() : '';
	}

	private static getEnvBoolean(varName: string, required = true): boolean {
		const valor = this.getEnv(varName, required);
		return valor ? valor.trim().toLowerCase() === 'true' : false;
	}

	private static getEnvNumber(varName: string, required = true): number {
		const valor = this.getEnv(varName, required);
		return valor ? Number(valor.trim()) : 0;
	}

	static variable = {
		PORT: this.getEnvNumber('PORT'),
		URL_DATABASE: this.getEnvString('URL_DATABASE', false)
	};
}
