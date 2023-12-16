export function getErrorMessageOrDefault(error: any, customDefaultMessage?: string): string {
    var defaultMessage = customDefaultMessage || "Algo deu errado"

    var message =
        error.response ?
            error.response.data ?
                Array.isArray(error.response.data) ?
                    error.response.data.join(". ")
                    :
                    error.response.data
                :
                defaultMessage
            :
            defaultMessage

    return message
}