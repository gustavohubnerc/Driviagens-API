import { Router } from "express";
import { validateSchema } from "../middlewares/schema.validation.js";
import { flightSchema } from "../schemas/flights.schema.js";
import { createFlightController, getFlightsController } from "../controllers/flights.controllers.js";

const flightsRouter = Router();

flightsRouter.post("/flights", validateSchema(flightSchema), createFlightController);
flightsRouter.get("/flights", getFlightsController);

export default flightsRouter;
