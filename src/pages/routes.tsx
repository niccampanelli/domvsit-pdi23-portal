import { ReactNode } from "react"
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom"
import LoadingRoutes from "../components/LoadingRoutes"
import { useAuthContext } from "../context/Auth"
import NavigationProvider from "../context/Navigation"
import { isUser } from "../types/context/User"
import Auth from "./auth"
import AdminLogin from "./auth/admin/Login"
import AdminSignUp from "./auth/admin/SignUp"
import AttendantJoin from "./auth/attendant/Join"
import AttendantLogin from "./auth/attendant/Login"
import Home from "./home"
import Main from "./main"
import AdminClients from "./main/admin/clients"
import AdminDashboard from "./main/admin/dashboard"
import AdminEvents from "./main/admin/events"
import AttendantDashboard from "./main/attendant/dashboard"
import AttendantEvents from "./main/attendant/events"

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
        else {
            if (isUser(user))
                return <Navigate to="/admin" />
            else
                return <Navigate to="/attendant" />
        }
    }
}

function ProtectedRoutes({
    children,
    routesType
}: {
    children: ReactNode,
    routesType: "admin" | "attendant"
}) {

    const { user, userLoading } = useAuthContext()

    if (userLoading) {
        return <LoadingRoutes />
    }
    else {
        if (user) {
            if (isUser(user) && routesType === "admin")
                return children
            else if (!isUser(user) && routesType === "attendant")
                return children
            else if (isUser(user) && routesType === "attendant")
                return <Navigate to="/admin" />
            else if (!isUser(user) && routesType === "admin")
                return <Navigate to="/attendant" />
            else {
                if (routesType === "admin")
                    return <Navigate to="/auth/login" />
                else
                    return <Navigate to="/auth/attendant/login" />
            }
        }
        else {
            if (routesType === "admin")
                return <Navigate to="/auth/login" />
            else
                return <Navigate to="/auth/attendant/login" />
        }
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
                            path: "/auth",
                            element: <Navigate to="/auth/login" />
                        },
                        {
                            path: "/auth/login",
                            element: <AdminLogin />
                        },
                        {
                            path: "/auth/signup",
                            element: <AdminSignUp />
                        },
                        {
                            path: "/auth/attendant",
                            element: <Navigate to="/auth/attendant/login" />
                        },
                        {
                            path: "/auth/attendant/login",
                            element: <AttendantLogin />
                        },
                        {
                            path: "/auth/attendant/join",
                            element: <AttendantJoin />
                        }
                    ]
                },
                {
                    path: "/admin",
                    element: (
                        <ProtectedRoutes routesType="admin">
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
                        },
                        {
                            path: "/admin/clients",
                            element: <AdminClients />
                        }
                    ]
                },
                {
                    path: "/attendant",
                    element: (
                        <ProtectedRoutes routesType="attendant">
                            <Main />
                        </ProtectedRoutes>
                    ),
                    children: [
                        {
                            path: "/attendant",
                            element: <AttendantDashboard />
                        },
                        {
                            path: "/attendant/events",
                            element: <AttendantEvents />
                        },
                    ]
                }
            ]
        }
    ])

    return <RouterProvider router={router} />
}