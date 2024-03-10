/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_AUTH_API_BASE_URL: string
    readonly VITE_CLIENT_API_BASE_URL: string
    readonly VITE_EVENT_API_BASE_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}