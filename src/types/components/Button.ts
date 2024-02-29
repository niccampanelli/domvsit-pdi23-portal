import { ButtonHTMLAttributes } from "react"

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    onClick?: () => void
    disabled?: boolean
    children?: React.ReactNode
    link?: boolean
    to?: string
    variant?: "primary" | "secondary"
}