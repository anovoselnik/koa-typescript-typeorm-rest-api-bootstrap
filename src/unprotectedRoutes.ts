import Router from 'koa-router';
import controller = require('./controller');

const unprotectedRouter = new Router();

// Hello World route
unprotectedRouter.get('/', controller.general.helloWorld);
unprotectedRouter.post('/auth/signup', controller.auth.signup);
unprotectedRouter.post('/auth/login', controller.auth.login);
unprotectedRouter.post('/auth/confirm-email', controller.auth.confirmEmail);

export { unprotectedRouter };
