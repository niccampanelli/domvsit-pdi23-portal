import { ChangeEvent, InputHTMLAttributes } from "react"

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement & HTMLTextAreaElement> {
    placeholder?: string
    lines?: number
    value?: string
    onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    error?: string
}