import express from 'express';

import { AdminOrderStatusUpdate, createAnOrder, getAllOrders, getUserOrder } from '../controllers/ordersController.js';

const router = express.Router();


router.post('/', createAnOrder)
router.get("/:id", getUserOrder)
router.get("/", getAllOrders)
router.patch("/status/:id", AdminOrderStatusUpdate)

export default router