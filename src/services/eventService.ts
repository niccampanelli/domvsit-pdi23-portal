import { GetMarkedUnmarkedResponseType, GetShowedUpByClientResponseType, IAcceptRequest, IGetMarkedUnmarkedRequest, IGetShowedUpByClientRequest, IGetShowedUpPercentagesRequest, IGetShowedUpPercentagesResponse, IListRequest, INewRequest, INewResponse, IShowUpRequest, IUpdateRequest, IUpdateResponse, ListResponseType } from "../types/services/eventService"
import API from "./api"

async function newEvent(request: INewRequest): Promise<INewResponse> {
    const { data } = await API.eventApi.post<INewResponse>("event/new", request)

    return data
}

async function list(request?: IListRequest): Promise<ListResponseType> {
    const { data } = await API.eventApi.get<ListResponseType>("event/list", {
        params: request
    })

    return data
}

async function update(request: IUpdateRequest): Promise<IUpdateResponse> {
    const { data } = await API.eventApi.put<IUpdateResponse>(`event/update/${request.id}`, {
        ...request,
        id: undefined,
        status: request.status === undefined ? true : request.status
    })

    return data
}

async function deleteEvent(id: number): Promise<void> {
    await API.eventApi.delete(`event/delete/${id}`)
}

async function accept(id: number, request: IAcceptRequest): Promise<void> {
    await API.eventApi.post(`event/accept/${id}`, request)
}

async function showUp(id: number, request: IShowUpRequest): Promise<void> {
    await API.eventApi.post(`event/showUp/${id}`, request)
}

async function getShowedUpPercentages(request: IGetShowedUpPercentagesRequest = {}): Promise<IGetShowedUpPercentagesResponse> {
    const { data } = await API.eventApi.get("chart/showedUpPercentages", {
        params: request
    })

    return data
}

async function getMarkedUnmarked(request: IGetMarkedUnmarkedRequest = {}): Promise<GetMarkedUnmarkedResponseType> {
    const { data } = await API.eventApi.get("chart/markedUnmarked", {
        params: request
    })

    return data
}

async function getShowedUpByClient(request: IGetShowedUpByClientRequest = {}): Promise<GetShowedUpByClientResponseType> {
    const { data } = await API.eventApi.get("chart/showedUpByClient", {
        params: request
    })

    return data
}

export default {
    newEvent,
    list,
    update,
    deleteEvent,
    accept,
    showUp,
    getShowedUpPercentages,
    getMarkedUnmarked,
    getShowedUpByClient
}