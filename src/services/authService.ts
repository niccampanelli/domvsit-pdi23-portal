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
    const { data } = await API.authApi.post<IRevalidateTokenResponse>("authentication/revalidateToken")

    return data
}

export default {
    authenticate,
    resetPassword,
    signUp,
    revalidateToken
}