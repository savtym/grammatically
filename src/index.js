import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import bearerToken from 'express-bearer-token';
import cors from 'cors';
import http from 'http';

import routes from './routes/index';
// Constants
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

// App
const app = express();
const server = http.Server(app);

// CORS
app.use(cors({
	origin: process.env.FRONTEND_URI || 'http://localhost:8080',
	optionsSuccessStatus: 200,
}));


app.use(bearerToken());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true,
}));

// Add routes for API
routes(app, '/api/v1');

app.use(express.static(
	path.resolve(__dirname, '..', 'dist'),
));

app.get('/', (req, res) => res.send('It\'s back-end side. Please, study documentation.'));

server.listen(PORT, HOST);

// eslint-disable-next-line no-console
console.log(`Running on http://${HOST}:${PORT}`);
