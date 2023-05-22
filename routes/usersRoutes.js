import express from "express"
import {  deleteUser, findAllUsers, findUser, updateUser, userLogIn, userRegistration } from "../controllers/usersController.js"

const router = express.Router();

router.post("/", userRegistration)
router.post("/login", userLogIn)

router.get("/:id", findUser)
router.get("/", findAllUsers)
router.delete("/:id", deleteUser)
router.patch("/:id", updateUser)



export default router;

