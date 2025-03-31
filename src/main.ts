import cluster from 'node:cluster';
import { cpus } from 'node:os';
import AppController from './infra/controller/AppController';
import { setPostgresTypes } from './infra/helpers/DataBase';
import Env from './infra/helpers/Env';
import ExpressAdapter from './infra/http/ExpressAdapter';

const numOfCPUs = cpus().length;
if (cluster.isPrimary) {
	console.log(`Processo principal criado: ${process.pid}`);

	for (let i = 0; i < numOfCPUs; i++) {
		console.log(`Criando processo filho: ${i}...`);
		cluster.fork();
	}

	cluster.on('online', (worker) => {
		console.log(`Processo ${worker.process.pid} online`);
	});

	cluster.on('exit', (worker) => {
		console.log(`Processo ${worker.process.pid} finalizado`);
		cluster.fork();
	});
} else {
	setPostgresTypes();
	const http = new ExpressAdapter();

	new AppController(http);
	http.setupErrorHandler();
	http.listen(Env.variable.PORT || 3000);
}
