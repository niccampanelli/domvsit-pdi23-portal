import { Link as RouterLink } from "react-router-dom";
import { ILinkProps } from "../../types/components/Link";
import styles from "./link.module.css";
import { classes } from "../../util/classes";

export default function Link({
    color = "primary",
    children,
    className,
    ...props
}: ILinkProps) {

    return (
        <RouterLink
            {...props}
            className={classes(styles.root, styles[color], className)}
        >
            {children}
        </RouterLink>
    )
}