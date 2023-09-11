import { createPassenger, getPassengersWithTravelCount } from "../repositories/passenger.repository.js";
import { passengerQuerySchema } from "../schemas/passengerquery.schema.js";
import { invalidDataError } from "../errors/invalidData.js";
import { manyResultsFoundError } from "../errors/manyResultsFound.js";
import httpStatus from "http-status";

export async function createPassengerService(firstName, lastName) {
    await createPassenger(firstName, lastName);
}

export async function filterPassengersWithTravelCount(queryParams){
    const { error, value } = passengerQuerySchema.validate(queryParams, { convert: true });

    if (error) {
        throw invalidDataError('Parâmetro');
    }

    const passengers = await getPassengersWithTravelCount(value.name);

    if (passengers.length > 10) {
        throw (manyResultsFoundError());
    }

    return passengers;
}

export const passengersService = {
    createPassengerService,
    filterPassengersWithTravelCount
}