import { IButtonProps } from "../../types/components/Button"
import { classes } from "../../util/classes"
import ButtonLink from "./Link"
import styles from "./button.module.css"

export default function Button({
    onClick = () => { },
    disabled = false,
    children,
    className,
    link,
    to,
    ...props
}: IButtonProps) {

    return link ?
        (
            <ButtonLink
                to={to}
                className={classes(styles.root, className)}
                disabled={disabled}
            >
                {children}
            </ButtonLink>
        )
        :
        (
            <button
                onClick={onClick}
                className={classes(styles.root, className)}
                disabled={disabled}
                {...props}
            >
                {children}
            </button>
        )
}