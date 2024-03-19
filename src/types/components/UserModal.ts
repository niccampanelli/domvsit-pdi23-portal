import { IUser } from "../context/User"

export interface IUserModalProps {
    open: boolean
    onClose: () => void
    user?: IUser
    openChangePasswordModal: () => void
}