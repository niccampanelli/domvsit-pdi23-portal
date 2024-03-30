interface IShowedUpByClientItemClient {
    id: number
    name: string
}

export interface IShowedUpByClientItem {
    eventCount: number
    client: IShowedUpByClientItemClient
}