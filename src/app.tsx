import AuthProvider from "./context/Auth"
import ToastsProvider from "./context/Toasts"
import Routes from "./pages/routes"

export default function App() {

    return (
        <ToastsProvider dismissTimeInSeconds={8}>
            <AuthProvider>
                <Routes />
            </AuthProvider>
        </ToastsProvider>
    )
}