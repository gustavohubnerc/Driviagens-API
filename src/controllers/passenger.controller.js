import httpStatus from "http-status";
import { passengersService } from "../services/passenger.services.js";

export async function createPassengerController(req, res) {
    const { firstName, lastName } = req.body;

    await passengersService.createPassengerService(firstName, lastName);

    res.sendStatus(httpStatus.CREATED);
}

export async function getPassengersWithCount(req, res) {
    const queryParams = req.query;

    const passengers = await passengersService.filterPassengersWithTravelCount(queryParams);
    
    res.status(httpStatus.OK).json(passengers);
}

export const passengersController = {
    createPassengerController,
    getPassengersWithCount
}