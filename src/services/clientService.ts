import { IGetAttendantByIdResponse, IGetClientByIdResponse, IIdentifyRequest, IIdentifyResponse, IJoinRequest, IJoinResponse, IListAttendantRequest, IListClientRequest, ListAttendantResponseType, ListClientResponseType } from "../types/services/clientService";
import API from "./api";

async function authenticate(request: IIdentifyRequest): Promise<IIdentifyResponse> {
    const { data } = await API.clientApi.post<IIdentifyResponse>("attendant/authenticate", request)

    return data
}

async function join(request: IJoinRequest): Promise<IJoinResponse> {
    const { data } = await API.clientApi.post<IJoinResponse>("attendant/joinAsAttendant", request)

    return data
}

async function listAttendant(request: IListAttendantRequest): Promise<ListAttendantResponseType> {
    const { data } = await API.clientApi.get<ListAttendantResponseType>("attendant/list", {
        params: request
    })

    return data
}

async function listClient(request: IListClientRequest): Promise<ListClientResponseType> {
    const { data } = await API.clientApi.get<ListClientResponseType>("client/list", {
        params: request
    })

    return data
}

async function getAttendantById(id: number): Promise<IGetAttendantByIdResponse> {
    const { data } = await API.clientApi.get<IGetAttendantByIdResponse>(`attendant/${id}`)
    return data
}

async function getClientById(id: number): Promise<IGetClientByIdResponse> {
    const { data } = await API.clientApi.get<IGetClientByIdResponse>(`client/${id}`)
    return data
}

export default {
    authenticate,
    join,
    listAttendant,
    listClient,
    getAttendantById,
    getClientById
}