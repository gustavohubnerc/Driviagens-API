import { Router } from "express";
import { validateSchema } from "../middlewares/schema.validation.js";
import { passengerSchema } from "../schemas/passengers.schema.js";
import { createPassengerController, getPassengersWithCount } from "../controllers/passenger.controller.js";

const passengerRouter = Router();

passengerRouter.post("/passengers", validateSchema(passengerSchema), createPassengerController);
passengerRouter.get("/passengers/travels", getPassengersWithCount);

export default passengerRouter;
