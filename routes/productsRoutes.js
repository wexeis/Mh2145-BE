// import express from "express"
// import { createProduct, deleteAProduct, findAProduct, findAllProducts, updateAProduct } from "../controllers/productsController.js"
// import multerCloudinary from "../middleware/multerMIddleware.js"

// const router = express.Router()
// const multer = multerCloudinary();

// router.get('/', findAllProducts)
// router.get('/:id', findAProduct)
// router.post('/',multer.single("file"), createProduct)
// router.patch('/:id',multer.single("file") ,updateAProduct)
// router.delete('/:id', deleteAProduct)

// export default router

import express from "express";
import { createProduct, deleteAProduct, findAProduct, findAllProducts, updateAProduct } from "../controllers/productsController.js";
import cloudinaryStorage from "../middleware/multerMIddleware.js";

const router = express.Router();

router.get("/", findAllProducts);
router.get("/:id", findAProduct);

// Use the cloudinaryStorage instance directly instead of invoking it as a function
router.post("/", cloudinaryStorage.single("file"), createProduct);

router.patch("/:id", cloudinaryStorage.single("file"), updateAProduct);
router.delete("/:id", deleteAProduct);

export default router;

