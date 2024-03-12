export default function getTruncatedText(text: string, limit: number) {
    if (text.length > limit) {
        if (text[limit-1] === " ") {
            return text.slice(0, limit - 1) + "..."
        }
        return text.slice(0, limit) + "..."
    }
    return text
}