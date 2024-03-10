import { ReactNode } from "react"
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom"
import LoadingRoutes from "../components/LoadingRoutes"
import { useAuthContext } from "../context/Auth"
import NavigationProvider from "../context/Navigation"
import Auth from "./auth"
import AdminLogin from "./auth/admin/Login"
import AdminSignUp from "./auth/admin/SignUp"
import AttendantLogin from "./auth/attendant/Login"
import AttendantSignUp from "./auth/attendant/SignUp"
import Home from "./home"
import Main from "./main"
import AdminDashboard from "./main/admin/dashboard"
import AdminEvents from "./main/admin/events"

function AuthenticationRoutes({
    children
}: {
    children: ReactNode
}) {

    const { user, userLoading } = useAuthContext()

    if (userLoading) {
        return <LoadingRoutes />
    }
    else {
        if (!user)
            return children
        else
            return <Navigate to="/admin" />
    }
}

function ProtectedRoutes({
    children
}: {
    children: ReactNode
}) {

    const { user, userLoading } = useAuthContext()

    if (userLoading) {
        return <LoadingRoutes />
    }
    else {
        if (user)
            return children
        else
            return <Navigate to="/auth/login" />
    }
}

export default function Routes() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <NavigationProvider />,
            children: [
                {
                    path: "/",
                    element: <Home />
                },
                {
                    path: "/auth",
                    element: (
                        <AuthenticationRoutes>
                            <Auth />
                        </AuthenticationRoutes>
                    ),
                    children: [
                        {
                            path: "/auth/login",
                            element: <AdminLogin />
                        },
                        {
                            path: "/auth/signup",
                            element: <AdminSignUp />
                        },
                        {
                            path: "/auth/attendant/login",
                            element: <AttendantLogin />
                        },
                        {
                            path: "/auth/attendant/signup",
                            element: <AttendantSignUp />
                        }
                    ]
                },
                {
                    path: "/admin",
                    element: (
                        <ProtectedRoutes>
                            <Main />
                        </ProtectedRoutes>
                    ),
                    children: [
                        {
                            path: "/admin",
                            element: <AdminDashboard />
                        },
                        {
                            path: "/admin/events",
                            element: <AdminEvents />
                        }
                    ]
                }
            ]
        }
    ])

    return <RouterProvider router={router} />
}