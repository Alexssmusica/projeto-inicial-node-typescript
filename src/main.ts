import AppController from './infra/controller/AppController';
import Env from './infra/http/Env';
import ExpressAdapter from './infra/http/ExpressAdapter';

const http = new ExpressAdapter();

new AppController(http);

http.listen(Env.variable.PORT);
