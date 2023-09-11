import { Router } from "express";
import { validateSchema } from "../middlewares/schema.validation.js";
import { passengerSchema } from "../schemas/passengers.schema.js";
import { passengersController } from "../controllers/passenger.controller.js";

const passengerRouter = Router();

passengerRouter.post("/passengers", validateSchema(passengerSchema), passengersController.createPassengerController);
passengerRouter.get("/passengers/travels", passengersController.getPassengersWithCount);

export default passengerRouter;
