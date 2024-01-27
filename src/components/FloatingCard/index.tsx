import { IFloatingCardProps } from "../../types/components/FloatingCard";
import { classes } from "../../util/classes";
import styles from "./floatingCard.module.css";

export default function FloatingCard({
    size = "medium",
    children,
    className,
    ...props
}: IFloatingCardProps) {

    return (
        <div
            className={classes(styles.root, styles[size], className)}
            {...props}
        >
            {children}
        </div>
    )
}