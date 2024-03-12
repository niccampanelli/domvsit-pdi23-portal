import { IListRequest, INewRequest, INewResponse, IUpdateRequest, IUpdateResponse, ListResponseType } from "../types/services/eventService"
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
        status: true
    })

    return data
}

export default {
    newEvent,
    list,
    update
}