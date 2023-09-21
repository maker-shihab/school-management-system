import { Router } from "express";
import { UserController } from "./users.controller";

const router = Router();

router.get("/", UserController.getAllUsers);
router.post("/create-user", UserController.createUser);
router.post("/login", UserController.loginUser);
router.get("/:id", UserController.getSingleUser);
router.patch("/:id", UserController.deleteUser);

export const userRouter = router;
