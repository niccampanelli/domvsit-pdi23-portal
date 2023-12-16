/**
 * Tenta obter a mensagem de erro da resposta da requisição, caso não seja possivel, retorna uma mensagem padrão
 * @param error Objeto com a resposta de erro
 * @param customDefaultMessage Mensagem personalizada para quando não for possivel obter a mensagem de erro
 * @returns 
 */
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