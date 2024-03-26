export interface IClientCardClient {
    id: number
    name: string
    email: string
}

export interface IClientCardProps {
    client: IClientCardClient,
    openViewModal?: () => void,
    openEditModal?: () => void,
    openDeleteModal?: () => void,
    showMenu?: boolean
}

export interface IClientCardMenuOption {
    icon: JSX.Element,
    label: string,
    onClick: () => void
}

export interface IClientCardMenuProps {
    options: IClientCardMenuOption[],
    anchorEl: HTMLElement | null,
    onClose: () => void
}