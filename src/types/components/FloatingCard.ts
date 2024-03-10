import { HTMLAttributes } from "react";
import { ComponentSizesType } from "./Components";

export interface IFloatingCardProps extends HTMLAttributes<HTMLDivElement> {
    size?: ComponentSizesType
}