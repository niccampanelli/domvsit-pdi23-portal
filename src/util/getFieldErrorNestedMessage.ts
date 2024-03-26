export default function getFieldErrorNestedMessages(error?: any, messages: string[] = []): string[] {
    Object.keys(error).forEach(key => {
        if (key === "message")
            messages.push(error[key])
        else if (typeof error[key] === "object")
            getFieldErrorNestedMessages(error[key], messages)
    })

    return messages
}