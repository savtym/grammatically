import userRoutes from './user';

const routes = {
	'/user': userRoutes,
};


export default (app, versionAPI) => {
	Object.keys(routes).forEach((key) => {
		app.use(versionAPI + key, routes[key]);
	});
};
