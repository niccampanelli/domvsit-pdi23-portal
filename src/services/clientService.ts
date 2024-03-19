import { ICreateClientRequest, ICreateClientResponse, IGetAttendantByIdResponse, IGetAttendantTokenResponse, IGetClientByIdResponse, IIdentifyRequest, IIdentifyResponse, IJoinRequest, IJoinResponse, IListAttendantRequest, IListClientRequest, IUpdateClientRequest, IUpdateClientResponse, ListAttendantResponseType, ListClientResponseType } from "../types/services/clientService"
import API from "./api"

async function createClient(request: ICreateClientRequest): Promise<ICreateClientResponse> {
    const { data } = await API.clientApi.post<ICreateClientResponse>("client/create", request)

    return data
}

async function updateClient(request: IUpdateClientRequest): Promise<IUpdateClientResponse> {
    const { data } = await API.clientApi.put<IUpdateClientResponse>(`client/update/${request.id}`, {
        ...request,
        id: undefined
    })

    return data
}

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

async function getAttendantToken(clientId: number): Promise<IGetAttendantTokenResponse> {
    const { data } = await API.clientApi.get<IGetAttendantTokenResponse>(`client/${clientId}/getAttendantToken`)
    return data
}

export default {
    createClient,
    updateClient,
    authenticate,
    join,
    listAttendant,
    listClient,
    getAttendantById,
    getClientById,
    getAttendantToken
}