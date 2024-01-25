import { Link as RouterLink } from "react-router-dom";
import { ILinkProps } from "../../types/components/Link";
import styles from "./link.module.css";
import { classes } from "../../util/classes";

export default function Link({
    color = "primary",
    children,
    ...props
}: ILinkProps) {

    return (
        <RouterLink
            className={classes(styles.root, styles[color], props.className)}
            {...props}
        >
            {children}
        </RouterLink>
    )
}