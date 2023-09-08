import { db } from "../database/database.connection.js";

export async function createFlight(origin, destination, date) {
    const result = await db.query(`INSERT INTO flights (origin, destination, date) VALUES ($1, $2, $3)`, [origin, destination, date]);
    return result;
}

export async function getFilteredFlights(filters) {
    const { origin, destination, smaller_date, bigger_date } = filters;

    const query = `
        SELECT f.id, c1.name AS origin, c2.name AS destination, TO_CHAR(f.date, 'DD-MM-YYYY') AS date
        FROM flights AS f
        JOIN cities AS c1 ON f.origin = c1.id
        JOIN cities AS c2 ON f.destination = c2.id
        WHERE ($1::text IS NULL OR c1.name = $1)
        AND ($2::text IS NULL OR c2.name = $2)
        AND ($3::date IS NULL OR f.date >= $3)
        AND ($4::date IS NULL OR f.date <= $4)
        ORDER BY f.date;
    `;

    const result = await db.query(query, [origin, destination, smaller_date, bigger_date]);
    return result.rows;
}

export async function getFlightById(id) {
    const result = await db.query(`SELECT * FROM flights WHERE id = $1`, [id]);
    return result.rows[0];
}