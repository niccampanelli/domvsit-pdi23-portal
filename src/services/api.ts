import axios, { AxiosInstance } from "axios"

export default class API {

    private static _authApi: AxiosInstance
    private static _clientApi: AxiosInstance

    public static get authApi(): AxiosInstance {
        if (!this._authApi) {
            this._authApi = this.createInstance(import.meta.env.VITE_AUTH_API_BASE_URL)
        }

        return this._authApi
    }

    public static get clientApi(): AxiosInstance {
        if (!this._clientApi) {
            this._clientApi = this.createInstance(import.meta.env.VITE_CLIENT_API_BASE_URL)
        }

        return this._clientApi
    }

    private static createInstance(baseURL: string): AxiosInstance {
        return axios.create({
            baseURL: baseURL,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authentication_token")}`,
                RefreshToken: localStorage.getItem("authentication_refresh_token")
            }
        })
    }

    public static refreshInstances(): void {
        this._authApi = this.createInstance(import.meta.env.VITE_AUTH_API_BASE_URL)
        this._clientApi = this.createInstance(import.meta.env.VITE_CLIENT_API_BASE_URL)
    }
}