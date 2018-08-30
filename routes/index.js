
import userRoutes from './user';

const routes = {
  '/user': userRoutes,
};


export default (app, versionAPI) => {
  routes.forEach((key) => {
    app.use(versionAPI + key, routes[key]);
  });
};
