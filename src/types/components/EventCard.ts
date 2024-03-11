interface IEventCardEvent {
    id: number
    title: string
    description: string
    tags?: string[]
    ocurrence: Date
    link?: string
}

export interface IEventCardProps {
    event: IEventCardEvent
    onClick?: () => void
}