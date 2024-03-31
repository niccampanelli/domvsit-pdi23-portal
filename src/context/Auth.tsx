import { jwtDecode } from "jwt-decode"
import { createContext, useContext, useEffect, useState } from "react"
import API from "../services/api"
import authService from "../services/authService"
import clientService from "../services/clientService"
import { IAuthContext, IAuthProviderProps, IJwtTokenPayload } from "../types/context/Auth"
import { IUser } from "../types/context/User"
import { IAuthenticateRequest } from "../types/services/authService"
import { IIdentifyRequest } from "../types/services/clientService"
import { getErrorMessageOrDefault } from "../util/getErrorMessageOrDefault"
import { useToastsContext } from "./Toasts"

const AuthContext = createContext<IAuthContext>({
    attendantLogin: async () => { },
    login: async () => { },
    logout: () => { },
    userLoading: true,
    user: undefined
})

export default function AuthProvider({
    children
}: IAuthProviderProps) {

    const { addToast } = useToastsContext()

    const [user, setUser] = useState<IUser | undefined>(undefined)
    const [userLoading, setUserLoading] = useState(true)

    async function login(request: IAuthenticateRequest) {
        try {
            const response = await authService.authenticate(request)

            addToast({
                title: "Login realizado com sucesso",
                message: `Bem-vindo, ${response.name}!`,
                type: "success"
            })

            setUser(response)

            localStorage.setItem("authentication_token", response.token)
            localStorage.setItem("authentication_refresh_token", response.refreshToken)

            API.refreshInstances()
        }
        catch (error) {
            const message = getErrorMessageOrDefault(error)

            addToast({
                title: "Erro ao realizar o login",
                message,
                type: "error"
            })
        }
    }

    async function attendantLogin(request: IIdentifyRequest) {
        try {
            const response = await clientService.authenticate(request)

            setUser(response)

            addToast({
                title: "Login realizado com sucesso",
                message: `Bem-vindo, ${response.name}!`,
                type: "success"
            })

            localStorage.setItem("authentication_token", response.token)
            localStorage.setItem("authentication_refresh_token", response.refreshToken)

            API.refreshInstances()
        }
        catch (error) {
            const message = getErrorMessageOrDefault(error)

            addToast({
                title: "Erro ao realizar o login",
                message,
                type: "error"
            })
        }
    }

    function logout() {
        try {
            addToast({
                title: "Você saiu da sua conta",
                message: `Até logo, ${user?.name}!`,
                type: "info"
            })

            setUser(undefined)

            localStorage.removeItem("authentication_token")
            localStorage.removeItem("authentication_refresh_token")

            API.refreshInstances()
        }
        catch (error) {
            const message = getErrorMessageOrDefault(error)

            addToast({
                title: "Erro ao sair da conta",
                message,
                type: "error"
            })
        }
    }

    async function restoreUserData() {
        setUserLoading(true)

        try {
            const token = localStorage.getItem("authentication_token")
            var decodedToken: IJwtTokenPayload

            try {
                decodedToken = jwtDecode<IJwtTokenPayload>(token || "")
            }
            catch {
                throw new Error("Token inválido")
            }

            if (decodedToken.UserType === "Attendant") {
                const response = await clientService.restoreAttendantData()

                setUser(response)
            }
            else if (decodedToken.UserType === "User") {
                const response = await authService.restoreUserData()

                setUser(response)
            }
            else {
                throw new Error("Tipo de usuário inválido")
            }
        }
        catch (error) {
            const message = getErrorMessageOrDefault(error)

            addToast({
                title: "Erro ao restaurar os dados do usuário",
                message,
                type: "error"
            })
        }
        finally {
            setUserLoading(false)
        }
    }

    useEffect(() => {
        if (!user)
            restoreUserData()
    }, [])

    return (
        <AuthContext.Provider
            value={{
                attendantLogin,
                login,
                logout,
                user,
                userLoading
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)