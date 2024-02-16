import { useRouteError } from "react-router-dom"

export default function ErrorBoundary() {

    let error: any = useRouteError()

    console.log(error)

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                width: "100vw",
                backgroundColor: "var(--primary-color-500)",
            }}
        >
            <h1
                style={{
                    color: "var(--text-contrast-color)",
                    fontSize: "3rem",
                    marginBottom: "1rem",
                }}
            >
                {error && error.status === 404 ? "404" : "Error"}
            </h1>
            <p
                style={{
                    color: "var(--text-contrast-color)",
                    fontSize: "1.5rem",
                    marginBottom: "1rem",
                    textAlign: "center",
                }}
            >
                {error.message}
            </p>
            <p
                style={{
                    color: "var(--text-contrast-color)",
                    fontSize: "0.8rem",
                    textAlign: "left",
                    maxWidth: "60%",
                    whiteSpace: "pre-wrap",
                }}
            >
                {error && error.stack}
            </p>
        </div>
    )
}