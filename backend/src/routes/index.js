import express from 'express';
import formRoutes from './form.routes.js';

const router = express.Router();

router.use('/', formRoutes); // Mount form routes under the root path

export default router;