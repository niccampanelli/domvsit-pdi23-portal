import { HTMLAttributes } from "react";
import { ComponentSizesType } from "./Components";

export interface ICardProps extends HTMLAttributes<HTMLDivElement> {
    size?: ComponentSizesType
}