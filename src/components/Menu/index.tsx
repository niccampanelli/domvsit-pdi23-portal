import { IMenuProps } from "../../types/components/Menu"
import { classes } from "../../util/classes"
import FloatingCard from "../FloatingCard"
import styles from "./menu.module.css"

export default function Menu({
    options = [],
    ...props
}: IMenuProps) {

    return (
        <FloatingCard
            className={classes(styles.root, props.className)}
            {...props}
        >
            <ul className={styles.list}>
                {options.map(option => (
                    <li
                        key={option.name}
                        onClick={option.onClick}
                        className={styles.item}
                    >
                        {option.name}
                    </li>
                ))}
            </ul>
        </FloatingCard>
    )
}