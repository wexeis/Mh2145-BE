import express from "express";
import { createProduct, deleteAProduct, findAProduct, findAProductByCategory, findAllProducts, updateAProduct } from "../controllers/productsController.js";
import cloudinaryStorage from "../middleware/multerMIddleware.js";
import multerCloudinary from "../middleware/multerMIddleware.js";

const router = express.Router();

router.get("/", findAllProducts);
router.get("/:id", findAProduct);
router.get("/category/:id", findAProductByCategory)


router.post("/", multerCloudinary.single('file'), createProduct);

router.patch("/:id", cloudinaryStorage.single("file"), updateAProduct);
router.delete("/:id", deleteAProduct);

export default router;

