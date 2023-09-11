import httpStatus from "http-status";

export default function errorHandlerMiddleware(error, req, res, next) {
    console.log("error:", error);
    if (error.type === "badRequest") {
        return res.status(httpStatus.BAD_REQUEST).send(error.message);
    }
    
    if (error.type === "invalidData") {
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.message);
    }
    
    if (error.type === "conflict") {
        return res.status(httpStatus.CONFLICT).send(error.message);
    }
    
    if (error.type === "notFound") {
        return res.status(httpStatus.NOT_FOUND).send(error.message);
    }

    if (error.type === "manyResultsFound") {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
    
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Desculpe, algo deu errado. Tente novamente mais tarde.");
}