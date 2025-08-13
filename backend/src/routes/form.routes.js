import express from 'express';

// These functions handle the actual logic for CRUD operations on books.
import * as controller from '../controllers/form.controller.js'; 

const router = express.Router();

router.post('/books', controller.create);
router.get('/books', controller.list);
router.get('/books/:id', controller.getOne);
router.put('/books/:id', controller.update);
router.delete('/books/:id', controller.remove);

export default router;