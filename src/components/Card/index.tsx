import { ICardProps } from "../../types/components/Card"
import { classes } from "../../util/classes"
import styles from "./card.module.css"

export default function Card({
    size = "medium",
    children,
    ...props
}: ICardProps) {

    return (
        <div
            className={classes(styles.root, styles[size], props.className)}
            {...props}
        >
            {children}
        </div>
    )
}