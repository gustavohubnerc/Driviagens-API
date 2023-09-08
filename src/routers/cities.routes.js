import { Router } from "express";
import { validateSchema } from "../middlewares/schema.validation.js";
import { citiesSchema } from "../schemas/cities.schema.js";
import { addNewCityController } from "../controllers/cities.controllers.js";

const citiesRouter = Router();

citiesRouter.post("/cities", validateSchema(citiesSchema), addNewCityController);

export default citiesRouter;
