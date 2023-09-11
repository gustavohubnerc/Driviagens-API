import httpStatus from "http-status";
import { addNewCity } from "../repositories/cities.repository.js";
import { citiesServices } from "../services/cities.services.js";

export async function addNewCityController(req, res) {
    const { name } = req.body;

    await citiesServices.checkCityExists(name);

    await addNewCity(name);
    
    res.sendStatus(httpStatus.CREATED);
}

export const citiesController = {
    addNewCityController
}