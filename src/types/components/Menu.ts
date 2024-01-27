import { HTMLAttributes } from "react";

export interface IMenuOption {
    name: string
    onClick: () => void
}

export interface IMenuProps extends HTMLAttributes<HTMLDivElement> {
    options?: IMenuOption[]
}