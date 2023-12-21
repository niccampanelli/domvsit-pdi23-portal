import { ChangeEvent, HTMLAttributes } from "react"

export interface IInputProps extends HTMLAttributes<HTMLInputElement> {
    placeholder?: string
    value?: string
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
    error?: string
}