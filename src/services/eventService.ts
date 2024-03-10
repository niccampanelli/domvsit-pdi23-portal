import { IListRequest, INewRequest, INewResponse, ListResponseType } from "../types/services/eventService";
import API from "./api";

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

export default {
    newEvent,
    list
}