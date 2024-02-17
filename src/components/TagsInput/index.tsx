import { ChangeEvent, KeyboardEvent, useState } from "react";
import { ITagsInputProps } from "../../types/components/TagsInput";
import styles from "./tagsInput.module.css"

export default function TagsInput({
    placeholder,
    onChange = () => { },
    value = [],
    error,
    className,
    ...props
}: ITagsInputProps) {

    const [tags, setTags] = useState<string[]>([])
    const [inputValue, setInputValue] = useState("")

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value
        const lastCharacter = value.slice(-1)

        if (lastCharacter === "," && value.trim()) {
            setTags(previous => [...previous, value.trim().slice(0, -1)])
            onChange([...tags, value.trim().slice(0, -1)])
            setInputValue("")
        }
        else {
            setInputValue(value)
        }
    }

    function detectBackspace(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Backspace" && !inputValue) {
            setTags(previous => previous.slice(0, -1))
        }
    }

    return (
        <div>
            <div className={styles.root}>
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className={styles.tag}
                    >
                        {tag}
                    </span>
                ))}
                <input
                    className={styles.input}
                    placeholder={placeholder}
                    onChange={handleChange}
                    onKeyDown={detectBackspace}
                    value={inputValue}
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