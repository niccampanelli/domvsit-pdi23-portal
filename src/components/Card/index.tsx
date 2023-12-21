import { ICardProps } from "../../types/components/Card";
import { classes } from "../../util/classes";
import styles from "./card.module.css";

export default function Card({
    size = "medium",
    children,
    className,
    ...props
}: ICardProps) {

    return (
        <div
            className={classes(styles.root, styles[size], className)}
            {...props}
        >
            {children}
        </div>
    )
}