import { createFlight } from "../repositories/flights.repository.js";
import { flightsService } from "../services/flights.services.js";
import httpStatus from "http-status";

export async function createFlightController(req, res) {
    const { origin, destination, date } = req.body;

    await flightsService.checkFlightValidity(origin, destination, date);

    await createFlight(origin, destination, date);

    res.sendStatus(httpStatus.CREATED);
}

export async function getFlightsController(req, res) {
    const queryParams = req.query;

    const flights = await flightsService.filterFlights(queryParams);

    res.status(httpStatus.OK).json(flights);
}

export const flightsController = {
    createFlightController,
    getFlightsController
}