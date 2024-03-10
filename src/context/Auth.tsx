import { createContext, useContext, useEffect, useState } from "react"
import API from "../services/api"
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
    user: undefined,
    userDataLoading: true,
    logout: async () => { },
})

export default function AuthProvider({
    children
}: IAuthProviderProps) {

    const { addToast } = useToastsContext()

    const [user, setUser] = useState<IUser | undefined>()
    const [userDataLoading, setUserDataLoading] = useState(true)

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

            API.refreshInstances()
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

            API.refreshInstances()
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

    async function logout(): Promise<void> {
        try {
            addToast({
                title: "Você foi desconectado",
                message: `Até logo, ${user?.name}`,
            })

            setUser(undefined)

            localStorage.removeItem("authentication_token")
            localStorage.removeItem("authentication_refresh_token")

            API.refreshInstances()
        }
        catch (error) {
            console.error(error)
            var message = getErrorMessageOrDefault(error)

            addToast({
                title: "Erro ao fazer logout",
                message: message,
                type: "error",
            })
        }
    }

    async function restoreUserData(): Promise<void> {
        setUserDataLoading(true)

        try {
            const response = await authService.restoreUserData()

            setUser(response)
        }
        catch (error) {
            console.error(error)
            var message = getErrorMessageOrDefault(error)

            addToast({
                title: "Erro ao restaurar dados do usuário",
                message: message,
                type: "error",
            })
        }
        finally {
            setUserDataLoading(false)
        }
    }

    useEffect(() => {
        if (!user) {
            restoreUserData()
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            login,
            loginAttendant,
            user,
            userDataLoading,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)