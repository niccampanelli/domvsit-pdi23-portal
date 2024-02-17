import AuthProvider from "./context/Auth"
import ModalProvider from "./context/Modal"
import ToastsProvider from "./context/Toasts"
import Routes from "./pages/routes"

export default function App() {

    return (
        <ToastsProvider dismissTimeInSeconds={8}>
            <AuthProvider>
                <ModalProvider>
                    <Routes />
                </ModalProvider>
            </AuthProvider>
        </ToastsProvider>
    )
}