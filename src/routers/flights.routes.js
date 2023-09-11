import { Router } from "express";
import { validateSchema } from "../middlewares/schema.validation.js";
import { flightSchema } from "../schemas/flights.schema.js";
import { flightsController } from "../controllers/flights.controllers.js";

const flightsRouter = Router();

flightsRouter.post("/flights", validateSchema(flightSchema), flightsController.createFlightController);
flightsRouter.get("/flights", flightsController.getFlightsController);

export default flightsRouter;
