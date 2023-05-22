import express from "express"
import { AllCarts, addToCart, deleteACart, deleteAllCarts } from "../controllers/cartController.js";

const router = express.Router();

router.get("/", AllCarts);
router.get("/:id", AllCarts);


router.post('/', addToCart)
router.delete("/deletecarts", deleteAllCarts);
router.delete("/:id", deleteACart);



export default router