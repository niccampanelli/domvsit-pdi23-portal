import { ICardProps } from "./Card"
import { ComponentSizesType } from "./Components"

export interface IModalProps extends ICardProps {
    open: boolean
    onClose: () => void
    title?: string
    size?: ComponentSizesType
}