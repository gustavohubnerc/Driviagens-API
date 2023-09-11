import { db } from "../database/database.connection.js";

export async function createPassenger(firstName, lastName) {
    const result = await db.query(`INSERT INTO passengers (firstName, lastName) VALUES ($1, $2)`, [firstName, lastName]);
    return result;
}

export async function getPassengersWithTravelCount(name) {
    const query = `
        SELECT p.firstname || ' ' || p.lastname AS passenger, COUNT(t.passengerId) AS travels
        FROM passengers AS p
        LEFT JOIN travels AS t ON p.id = t.passengerId
        WHERE $1::text IS NULL OR (p.firstname || ' ' || p.lastname) ILIKE '%' || $1 || '%'
        GROUP BY p.id
        ORDER BY travels DESC
        ;
    `;

    const result = await db.query(query, [name]);
    return result.rows;
}

export async function getPassengerById(id) {
    const result = await db.query(`SELECT * FROM passengers WHERE id = $1`, [id]);
    return result.rows[0];
}