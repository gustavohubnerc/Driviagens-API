import Joi from "joi";

export const flightQuerySchema = Joi.object({
    origin: Joi.string().max(50).allow(null),
    destination: Joi.string().max(50).allow(null),
    smaller_date: Joi.string().regex(/^\d{2}-\d{2}-\d{4}$/).allow(null),
    bigger_date: Joi.string().regex(/^\d{2}-\d{2}-\d{4}$/).allow(null),
});