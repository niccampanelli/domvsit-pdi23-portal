import { IButtonProps } from "../../types/components/Button"
import { classes } from "../../util/classes"
import styles from "./button.module.css"

export default function Button({
    onClick = () => { },
    children,
    ...props
}: IButtonProps) {

    return (
        <button
            onClick={onClick}
            className={classes(styles.root, props.className)}
            {...props}
        >
            {children}
        </button>
    )
}