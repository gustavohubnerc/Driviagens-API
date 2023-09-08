import httpStatus from "http-status";
import { addNewCity } from "../repositories/cities.repository.js";
import { citiesServices } from "../services/cities.services.js";
import { citiesSchema } from "../schemas/cities.schema.js";

export async function addNewCityController(req, res) {
    const { name } = req.body;

    try {
        const validationResult = citiesSchema.validate({ name });

        if (validationResult.error) {
            res.status(httpStatus.BAD_REQUEST).send(validationResult.error.details[0].message);
            return;
        }
        await citiesServices.checkCityExists(name);

        await addNewCity(name);
        
        res.sendStatus(httpStatus.CREATED);
    } catch (error) {
        if (error === httpStatus.CONFLICT) {
            res.status(httpStatus.CONFLICT).send("A cidade já existe.");
        } else {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
        }
    }
}