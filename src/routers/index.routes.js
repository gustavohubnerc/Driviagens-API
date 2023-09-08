import { Router } from "express";
import passengerRouter from "./passenger.routes.js";
import citiesRouter from "./cities.routes.js";
import flightsRouter from "./flights.routes.js";
import travelsRouter from "./travels.routes.js";

const router = Router();

router.use(passengerRouter);
router.use(citiesRouter);
router.use(flightsRouter);
router.use(travelsRouter);

export default router;