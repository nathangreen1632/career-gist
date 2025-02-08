import express, { Application } from 'express';
import dotenv from 'dotenv';
import logger from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';
import { userRouter } from './routes/api/userRoutes.js';
import jobRoutes from './routes/jobsRoutes.js';
import gptAPIRouter from './routes/api/gptRoutes.js';
import favoriteRoutes from './routes/favorites.js';
import jSearchRoutes from './routes/api/jSearchRoutes.js';
import sequelize from './config/connection.js';
import JobModel from './models/JobModel.js';
import limiter from "./middleware/rateLimiter.js";
import {authenticateToken} from "./middleware/auth.js";

dotenv.config();

const app: Application = express();
const PORT: number = parseInt(process.env.PORT ?? "3001", 10);

app.use(express.json());
app.use(logger);
app.use('/api', limiter)
app.use('/api/users', authenticateToken, userRouter);
app.use('/api/jobs', jobRoutes);
app.use('/api/gpt', gptAPIRouter);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/jsearch', jSearchRoutes);
app.use(errorHandler);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established.");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
  try {
    await JobModel.sync();
    console.log("✅ JobModel synced successfully.");
  } catch (error) {
    console.error("❌ JobModel sync failed:", error);
  }
  try {
    await sequelize.sync();
    console.log("✅ All models were synchronized successfully.");
  } catch (error) {
    console.error("❌ Database sync failed:", error);
  }
  try {
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database sync failed:", error);
    process.exit(1);
  }
})();
