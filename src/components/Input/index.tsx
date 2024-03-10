import { IInputProps } from "../../types/components/Input"
import { classes } from "../../util/classes"
import Visibility from "../../assets/icons/visibility.svg?react"
import VisibilityOff from "../../assets/icons/visibility_off.svg?react"
import styles from "./input.module.css"
import { useState } from "react"

export default function Input({
    placeholder,
    onChange = () => { },
    value = "",
    error,
    type = "text",
    lines,
    className,
    ...props
}: IInputProps) {

    const [inputVisible, setInputVisible] = useState(type !== "password")

    return (
        <div
            className={styles.root}
        >
            <div
                className={styles.container}
            >
                {lines ?
                    <textarea
                        className={classes(styles.input, className)}
                        placeholder={placeholder}
                        onChange={onChange}
                        value={value}
                        rows={lines}
                        {...props}
                    />
                    :
                    <input
                        className={classes(styles.input, className)}
                        placeholder={placeholder}
                        onChange={onChange}
                        value={value}
                        type={type === "password" && inputVisible ? "text" : type}
                        {...props}
                    />
                }
                {type === "password" &&
                    <button
                        className={styles.button}
                        onClick={() => setInputVisible(previous => !previous)}
                        type="button"
                        title="Mostrar senha"
                    >
                        {inputVisible ?
                            <VisibilityOff
                                className={styles.icon}
                            />
                            :
                            <Visibility
                                className={styles.icon}
                            />
                        }
                    </button>
                }
            </div>
            <span
                className={styles.errorMessage}
            >
                {error}
            </span>
        </div>
    )
}