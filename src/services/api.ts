import axios, { AxiosInstance } from "axios"
import authService from "./authService"

export default class API {

    private static _authApi: AxiosInstance
    private static _clientApi: AxiosInstance
    private static _eventApi: AxiosInstance

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

    public static get eventApi(): AxiosInstance {
        if (!this._eventApi) {
            this._eventApi = this.createInstance(import.meta.env.VITE_EVENT_API_BASE_URL)
        }

        return this._eventApi
    }

    private static createInstance(baseURL: string): AxiosInstance {

        const instance = axios.create({
            baseURL: baseURL,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authentication_token")}`
            },
        })

        function isDatetimeString(value: string) {
            const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/
            return regex.test(value)
        }

        function transformDatetimeStrings(data: any) {
            for (const key in data) {
                if (typeof data[key] === "string" && isDatetimeString(data[key])) {
                    data[key] = new Date(data[key])
                } else if (typeof data[key] === "object") {
                    transformDatetimeStrings(data[key])
                }
            }
        }

        instance.interceptors.response.use(
            function (response) {
                if (response.data && typeof response.data === "object") {
                    transformDatetimeStrings(response.data)
                }
                return response
            },
            async function (error) {
                const originalRequest = error.config

                if (error.response.status === 401 && error.response.headers["token-expired"]) {
                    const response = await authService.revalidateToken()

                    if (response.token) {
                        localStorage.setItem("authentication_token", response.token)
                        instance.defaults.headers.common["Authorization"] = `Bearer ${response.token}`
                        
                        API.refreshInstances()

                        originalRequest.headers["Authorization"] = `Bearer ${response.token}`

                        const retry = await instance.request(originalRequest)
                        return Promise.resolve(retry)
                    }
                }

                return Promise.reject(error)
            }
        )

        return instance
    }

    public static refreshInstances(): void {
        this._authApi = this.createInstance(import.meta.env.VITE_AUTH_API_BASE_URL)
        this._clientApi = this.createInstance(import.meta.env.VITE_CLIENT_API_BASE_URL)
        this._eventApi = this.createInstance(import.meta.env.VITE_EVENT_API_BASE_URL)
    }
}