import { CssBaseline, StyledEngineProvider, ThemeProvider } from "@mui/material"
import theme from "./theme"
import Routes from "./pages/routes"
import AuthProvider from "./context/Auth"
import ToastsProvider from "./context/Toasts"

export default function App() {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <ToastsProvider dismissTime={5000}>
                    <AuthProvider>
                        <CssBaseline />
                        <Routes />
                    </AuthProvider>
                </ToastsProvider>
            </ThemeProvider>
        </StyledEngineProvider>
    )
}