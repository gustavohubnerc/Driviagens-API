import { getPassengerById } from "../repositories/passenger.repository.js";
import { getFlightById } from "../repositories/flights.repository.js";
import { notFoundError } from "../errors/notFound.js";

export async function checkPassengerAndFlightExistence(passengerId, flightId) {
    const passenger = await getPassengerById(passengerId);
    const flight = await getFlightById(flightId);

    if(!passenger || !flight) {
        throw notFoundError('Passageiro ou voo');
    }
}

export const travelsServices = {
    checkPassengerAndFlightExistence
}