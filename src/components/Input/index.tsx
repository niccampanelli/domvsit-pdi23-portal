import { IInputProps } from "../../types/components/Input";
import { classes } from "../../util/classes";
import styles from "./input.module.css";

export default function Input({
    placeholder,
    onChange = () => { },
    value = "",
    error,
    ...props
}: IInputProps) {

    return (
        <div>
            <div
                className={styles.root}
            >
                <input
                    className={classes(styles.input, props.className)}
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                    {...props}
                />
            </div>
            <span
                className={styles.errorMessage}
            >
                {error}
            </span>
        </div>
    )
}