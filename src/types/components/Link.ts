import { RefAttributes } from "react";
import { LinkProps } from "react-router-dom";

export interface ILinkProps extends LinkProps, RefAttributes<HTMLAnchorElement> {
    color?: "primary" | "default"
}