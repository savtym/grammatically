
const userRoutes = require('./user');

const routes = {
  '/user': userRoutes,
};



module.exports = (app, versionAPI) => {
  for (let key in routes) {
    if (!key.startsWith('/')) {
      app.use(versionAPI, routes[key]);
    } else {
      app.use(versionAPI + key, routes[key]);
    }
  }
};