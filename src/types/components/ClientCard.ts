export interface IClientCardClient {
    id: number
    name: string
    email: string
}

export interface IClientCardProps {
    client: IClientCardClient
}