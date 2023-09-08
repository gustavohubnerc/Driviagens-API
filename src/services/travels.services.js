import httpStatus from "http-status";
import { getPassengerById } from "../repositories/passenger.repository.js";
import { getFlightById } from "../repositories/flights.repository.js";

export async function checkPassengerAndFlightExistence(passengerId, flightId) {
    const passenger = await getPassengerById(passengerId);
    const flight = await getFlightById(flightId);

    if(!passenger || !flight) {
        throw httpStatus.NOT_FOUND;
    }
}