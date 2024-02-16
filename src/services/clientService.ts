import { IIdentifyRequest, IIdentifyResponse, IJoinRequest, IJoinResponse } from "../types/services/clientService";
import API from "./api";

async function authenticate(request: IIdentifyRequest): Promise<IIdentifyResponse> {
    const { data } = await API.clientApi.post<IIdentifyResponse>("attendant/authenticate", request)

    return data
}

async function join(request: IJoinRequest): Promise<IJoinResponse> {
    const { data } = await API.clientApi.post<IJoinResponse>("attendant/joinAsAttendant", request)

    return data
}

export default {
    authenticate,
    join
}