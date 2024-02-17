import { ICardProps } from "./Card"

interface IEventCardItem {
    id: number
    title: string
    description: string
    ocurrence: Date
    link?: string
    tags?: string[]
}

export interface IEventCardProps extends ICardProps {
    event: IEventCardItem
}