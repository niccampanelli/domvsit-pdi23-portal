import { ChangeEvent, InputHTMLAttributes } from "react"

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string
    value?: string
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
    error?: string
}