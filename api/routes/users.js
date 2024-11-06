import express from "express";
import { getUsers, addUser,updateUser,deleteUser, getUserById } from "../controllers/user.js";
const router = express.Router();

router.get("/getUsers", getUsers);
router.get("/getUserById/:id", getUserById);
router.post("/addUser", addUser);
router.put("/updateUser/:id", updateUser);
router.delete("/deleteUser/:id", deleteUser);


export default router;