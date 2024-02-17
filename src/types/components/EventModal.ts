import { IModalProps } from "./Modal";

interface IEventAttendant {
    id: number
    eventId: number
    attendantId: number
}

interface IEventModalItem {
    id?: number
    title: string
    description: string
    tags?: string[]
    link?: string
    consultorId: number
    ocurrence: Date
    createdAt: Date
    updatedAt: Date
    eventAttendants: IEventAttendant[]
}

export interface IEventModalProps extends Omit<IModalProps, "children" | "title"> {
    event?: IEventModalItem
}

export interface IEventViewProps {
    event: IEventModalItem
}

export interface IEventEditProps {
    event: IEventModalItem
}