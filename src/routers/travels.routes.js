import { Router } from "express";
import { validateSchema } from "../middlewares/schema.validation.js";
import { travelsSchema } from "../schemas/travels.schema.js";
import { travelsController } from "../controllers/travels.controllers.js";

const travelsRouter = Router();

travelsRouter.post("/travels", validateSchema(travelsSchema), travelsController.createTravelController);

export default travelsRouter;