import { Router } from "express";
import jSearchRoutes from "./jSearchRoutes.js";
import gptRoutes from "./gptRoutes.js";
import { userRouter } from "./userRoutes.js";
import { jobRouter } from './jobs.js';

const router : Router = Router();

router.use("/jsearch", jSearchRoutes);
router.use("/gpt", gptRoutes);
router.use("/users", userRouter);
router.use('/jobs', jobRouter);

export default router;
