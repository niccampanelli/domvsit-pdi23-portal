import { IAuthenticateRequest, IAuthenticateResponse, IResetPasswordRequest, IRevalidateTokenResponse, ISignUpRequest, ISignUpResponse } from "../types/services/authService"
import API from "./api"

async function authenticate(request: IAuthenticateRequest): Promise<IAuthenticateResponse> {
    const { data } = await API.authApi.post<IAuthenticateResponse>("authentication/authenticate", request)

    return data
}

async function resetPassword(request: IResetPasswordRequest): Promise<void> {
    const { data } = await API.authApi.post<void>("authentication/resetPassword", request)

    return data
}

async function signUp(request: ISignUpRequest): Promise<ISignUpResponse> {
    const { data } = await API.authApi.post<ISignUpResponse>("authentication/signUp", request)

    return data
}

async function revalidateToken(): Promise<IRevalidateTokenResponse> {
    const { data } = await API.authApi.post<IRevalidateTokenResponse>("authentication/revalidateToken", undefined, {
        headers: {
            "RefreshToken": localStorage.getItem("authentication_refresh_token") || ""
        }
    })
    return data
}

async function restoreUserData(): Promise<IAuthenticateResponse> {
    const { data } = await API.authApi.get<IAuthenticateResponse>("authentication/restoreUserData")
    data.token = localStorage.getItem("authentication_token") || ""
    data.refreshToken = localStorage.getItem("authentication_refresh_token") || ""
    return data
}

export default {
    authenticate,
    resetPassword,
    signUp,
    revalidateToken,
    restoreUserData
}