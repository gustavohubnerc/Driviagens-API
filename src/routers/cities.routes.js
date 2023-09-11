import { Router } from "express";
import { validateSchema } from "../middlewares/schema.validation.js";
import { citiesSchema } from "../schemas/cities.schema.js";
import { citiesController } from "../controllers/cities.controllers.js";

const citiesRouter = Router();

citiesRouter.post("/cities", validateSchema(citiesSchema), citiesController.addNewCityController);

export default citiesRouter;
