import { IButtonProps } from "../../types/components/Button"
import { classes } from "../../util/classes"
import ButtonLink from "./Link"
import styles from "./button.module.css"

export default function Button({
    onClick = () => { },
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
            >
                {children}
            </ButtonLink>
        )
        :
        (
            <button
                onClick={onClick}
                className={classes(styles.root, className)}
                {...props}
            >
                {children}
            </button>
        )
}