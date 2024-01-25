import { createContext, useContext, useState } from "react"
import authService from "../services/authService"
import clientService from "../services/clientService"
import { IAuthContext, IAuthProviderProps } from "../types/context/Auth"
import { IUser } from "../types/context/User"
import { IAuthenticateRequest } from "../types/services/authService"
import { IIdentifyRequest } from "../types/services/clientService"
import { getErrorMessageOrDefault } from "../util/getErrorMessageOrDefault"
import { useToastsContext } from "./Toasts"

const AuthContext = createContext<IAuthContext>({
    login: async () => { },
    loginAttendant: async () => { },
    user: undefined
})

export default function AuthProvider({ children }: IAuthProviderProps) {

    const { addToast } = useToastsContext()

    const [user, setUser] = useState<IUser | undefined>()

    async function login(request: IAuthenticateRequest): Promise<void> {
        try {
            const response = await authService.authenticate(request)

            addToast({
                title: "Login realizado com sucesso",
                message: `Bem vindo, ${response.name}`,
            })

            setUser(response)

            localStorage.setItem("authentication_token", response.token)
            localStorage.setItem("authentication_refresh_token", response.refreshToken)
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

    async function loginAttendant(request: IIdentifyRequest): Promise<void> {
        try {
            const response = await clientService.authenticate(request)

            addToast({
                title: "Login realizado com sucesso",
                message: `Bem vindo, ${response.name}`,
            })

            setUser(response)

            localStorage.setItem("authentication_token", response.token)
            localStorage.setItem("authentication_refresh_token", response.refreshToken)
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
            login,
            loginAttendant,
            user
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)