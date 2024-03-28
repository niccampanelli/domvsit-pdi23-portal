interface IEventCardEvent {
    id: number
    title: string
    description: string
    tags?: string[]
    ocurrence: Date
    status: boolean
    link?: string
}

export interface IEventCardProps {
    event: IEventCardEvent
    onClick?: () => void,
    openViewModal?: () => void
    openEditModal?: () => void
    openDeleteModal?: () => void
    onStatusChange?: (status: boolean) => void
    showMenu?: boolean
}

export interface IEventCardStyledProps {
    status: boolean
}

export interface IEventCardMenuOption {
    icon?: JSX.Element
    label?: string
    onClick?: () => void
    divider?: boolean
}

export interface IEventCardMenuProps {
    options: IEventCardMenuOption[]
    anchorEl: HTMLElement | null
    onClose: () => void
}