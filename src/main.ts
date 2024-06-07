import AppController from './infra/controller/AppController';
import ExpressAdapter from './infra/http/ExpressAdapter';
import { setPostgresTypes } from './infra/util/DataBase';
import Env from './infra/util/Env';

import cluster from 'cluster';
import { cpus } from 'os';
const numOfCPUs = cpus().length;
if (cluster.isPrimary) {
	console.log(`Processo principal criado: ${process.pid}`);

	for (let i = 0; i < numOfCPUs; i++) {
		console.log(`Criando processo filho: ${i}...`);
		cluster.fork();
	}
	cluster.on('exit', (worker, code, signal) => {
		console.log(`Processo ${worker.process.pid} finalizado`);
		cluster.fork();
	});
} else {
	setPostgresTypes();
	const http = new ExpressAdapter();

	new AppController(http);

	http.listen(Env.variable.PORT);
}
