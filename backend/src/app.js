import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';

const app = express();

//Middleware - CORS(allow request from frontend) and JSON parsing
app.use(cors());
app.use(express.json());
// Route Mounting : Mounts all routes from routes/index.js under the /api path.
app.use('/api', routes);
// Root route for health check
app.get('/', (req, res) => res.send('Bookstore API is running'));

export default app; // Export the app for use in server.js or other files