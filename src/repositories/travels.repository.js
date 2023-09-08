import { db } from "../database/database.connection.js";

export async function createTravel(passengerId, flightId) {
    const result = await db.query(`INSERT INTO travels (passengerId, flightId) VALUES ($1, $2)`, [passengerId, flightId]);
    return result;
}