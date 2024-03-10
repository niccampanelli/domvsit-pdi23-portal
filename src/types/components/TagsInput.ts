import { InputHTMLAttributes } from "react";

export interface ITagsInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
    placeholder?: string
    value?: string[]
    onChange?: (values: string[]) => void
    error?: string
}