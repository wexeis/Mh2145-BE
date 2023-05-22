import express from "express"
import { createACatergory, deleteAcategory, findACategory, findCategories, updateAcategory } from "../controllers/categoriesController.js";

const router = express.Router();

router.post("/", createACatergory)
router.get("/:id", findACategory)
router.get("/", findCategories)
router.delete("/:id", deleteAcategory)
router.patch("/:id", updateAcategory)



export default router;
