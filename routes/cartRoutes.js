import express from "express"
import { Acart, AllCarts, addToCart, deleteACart, deleteAllCarts } from "../controllers/cartController.js";

const router = express.Router();

router.get("/", AllCarts);
router.get("/:id", Acart);


router.post('/', addToCart)
router.delete("/deletecarts", deleteAllCarts);
router.delete("/:id", deleteACart);



export default router