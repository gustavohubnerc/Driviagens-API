export function badRequestError(resource = "Item") {
    return {
        type: "badRequest",
        message: `${resource}.`
    }
}