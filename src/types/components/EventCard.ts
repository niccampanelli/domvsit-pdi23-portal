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
    onClick?: () => void,
    openViewModal?: () => void
    openEditModal?: () => void
    openDeleteModal?: () => void
    showMenu?: boolean
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