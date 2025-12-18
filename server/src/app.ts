import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import { cityRoutes } from "./routes/cityRoutes";

const app = express();

app.use(express.json());
app.use(cityRoutes);
app.use(errorHandler);

export { app };

