import { IToastProps } from "../../types/components/Toast"

export default function Toast({
    title,
    message,
    type = "info",
    dismissable = true,
    autoDismiss = true,
    dismissTimeInSeconds = 5,
}: IToastProps) {
    
    return (
        <div>
            <h1>{title}</h1>
            <p>{message}</p>
        </div>
    )
}