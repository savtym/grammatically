
import routes from './routes';
import cors from 'cors';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import bearerToken from 'express-bearer-token';

// Constants
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

// App
const app = express();
const server = require('http').Server(app);

console.log(process.env.DATABASE_URL)

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

app.get('/', (req, res) => {
	return res.send('11111');
});

server.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);


