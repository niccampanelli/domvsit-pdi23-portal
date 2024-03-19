export interface IChangePasswordModalProps {
    open: boolean
    onClose: () => void
}

export interface IChangePasswordModalFormValues {
    oldPassword: string
    newPassword: string
    confirmNewPassword: string
}