import AppController from './infra/controller/AppController';
import ExpressAdapter from './infra/http/ExpressAdapter';
import Env from './infra/util/Env';

const http = new ExpressAdapter();

new AppController(http);

http.listen(Env.variable.PORT);
