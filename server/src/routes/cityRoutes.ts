import { Router } from "express";
import {
    createCity,
    deleteCity,
    getCity,
    listCities,
    updateCity
} from "../controllers/cityController";

const router = Router();

router.get("/cities", listCities);
router.get("/cities/:id", getCity);
router.post("/cities", createCity);
router.patch("/cities/:id", updateCity);
router.delete("/cities/:id", deleteCity);

export { router as cityRoutes };

