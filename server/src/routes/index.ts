import { Router } from "express";
import favoritesRoutes from "./favorites.js";
import jobsRoutes from "./jobsRoutes.js";
import apiRoutes from "./api/index.js";
import authRoutes from "./auth-routes.js"

const router : Router = Router();

router.use("/favorites", favoritesRoutes);
router.use("/jobs", jobsRoutes);
router.use("/auth", authRoutes);
router.use("/", apiRoutes);

export default router;
