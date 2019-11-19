import { SwaggerRouter } from 'koa-swagger-decorator';
import controller = require('./controller');
import jwt from './middlewares/jwt';

const protectedRouter = new SwaggerRouter();

// USER ROUTES
protectedRouter.get('/users', jwt, controller.user.getUsers);
protectedRouter.get('/users/current-user', jwt, controller.user.getCurrentUser);
protectedRouter.get('/users/:id', jwt, controller.user.getUser);
protectedRouter.put('/users/:id', jwt, controller.user.updateUser);
protectedRouter.delete('/users/:id', jwt, controller.user.deleteUser);

// Swagger endpoint
protectedRouter.swagger({
  title: 'node-typescript-koa-rest',
  description:
    'API REST using NodeJS and KOA framework, typescript. TypeORM for SQL with class-validators. Middlewares JWT, CORS, Winston Logger.',
  version: '1.5.0',
});

// mapDir will scan the input dir, and automatically call router.map to all Router Class
protectedRouter.mapDir(__dirname);

export { protectedRouter };
