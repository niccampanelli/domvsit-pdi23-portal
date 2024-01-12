import { Link } from "react-router-dom";
import styles from "../button.module.css"
import { IButtonProps } from "../../../types/components/Button";
import { classes } from "../../../util/classes";

export default function ButtonLink({
    to = "/",
    disabled = false,
    children,
    className
}: IButtonProps) {

    return (
        <Link
            to={disabled ? "#" : to}
            className={classes(styles.root, styles.link, className)}
        >
            {children}
        </Link>
    )
}