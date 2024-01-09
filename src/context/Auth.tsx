import { createContext, useContext } from "react"
import { IAuthContext, IAuthProviderProps } from "../types/context/Auth"
import { IAuthenticateRequest } from "../types/services/authService"
import authService from "../services/authService"
import { useToastsContext } from "./Toasts"
import { getErrorMessageOrDefault } from "../util/getErrorMessageOrDefault"

const AuthContext = createContext<IAuthContext>({
    login: async () => { }
})

export default function AuthProvider({ children }: IAuthProviderProps) {

    const { addToast } = useToastsContext()

    async function login(request: IAuthenticateRequest): Promise<void> {
        try {
            const response = await authService.authenticate(request)

            addToast({
                title: "Login realizado com sucesso",
                message: `Bem vindo, ${response.name}`,
            })
        }
        catch (error) {
            console.error(error)
            var message = getErrorMessageOrDefault(error)

            addToast({
                title: "Erro ao fazer login",
                message: message,
                type: "error",
            })
        }
    }

    return (
        <AuthContext.Provider value={{
            login
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)