import { Router } from "express";
import { userRouter } from "../modules/users/users.route";

const router = Router();

const moduleRoute = [
  {
    path: "/users",
    route: userRouter,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));
export default router;
