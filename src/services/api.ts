import axios, { AxiosInstance } from "axios";

export default class API {

    private static _authApi: AxiosInstance

    public static get authApi(): AxiosInstance {
        if (!this._authApi) {
            this._authApi = this.createInstance(import.meta.env.VITE_AUTH_API_BASE_URL)
        }

        return this._authApi
    }

    private static createInstance(baseURL: string): AxiosInstance {
        return axios.create({
            baseURL: baseURL,
        });
    }

}