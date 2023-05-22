import express from 'express';

import { createAnOrder } from '../controllers/ordersController.js';

const router = express.Router();


router.post('/', createAnOrder)

export default router