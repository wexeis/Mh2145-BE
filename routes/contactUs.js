import express from "express";
import { contUs, getcontactus, postcontactus } from "../controllers/contactUs.js"

const router = express.Router();

router.get('/', getcontactus)
router.post('/', postcontactus)
router.delete('/:id', contUs)

export default router;  
