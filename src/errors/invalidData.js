export function invalidDataError(resource = "Item") {
    return {
        type: "invalidData",
        message: `${resource} inválido.`
    }
}