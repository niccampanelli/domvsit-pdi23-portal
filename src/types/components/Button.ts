import { HTMLAttributes } from "react"

export interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
    onClick?: () => void
    children?: React.ReactNode
    link?: boolean
    to?: string
}