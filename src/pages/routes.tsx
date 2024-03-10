import { Navigate, Outlet, RouterProvider, createBrowserRouter } from "react-router-dom"
import Dashboard from "./main/admin/dashboard"
import Auth from "./auth"
import Clients from "./main/client"
import UserSignUp from "./auth/user/signup"
import UserLogin from "./auth/user/login"
import Home from "./home"
import AttendantLogin from "./auth/attendant/login"
import AttendantJoin from "./auth/attendant/join"
import Main from "./main"
import NavigationProvider from "../context/Navigation"
import { useAuthContext } from "../context/Auth"
import LoadingRoutes from "../components/LoadingRoutes"
import ErrorBoundary from "../components/ErrorBoundary"
import Events from "./main/admin/events"

function ProtectedRoute() {

    const { user, userDataLoading } = useAuthContext()

    return (
        <>
            {userDataLoading &&
                <LoadingRoutes />
            }
            {!userDataLoading && !user &&
                <Navigate to="/login" />
            }
            {!userDataLoading && user &&
                <Outlet />
            }
        </>
    )
}

function AuthenticationRoutes() {

    const { user, userDataLoading } = useAuthContext()

    return (
        <>
            {userDataLoading &&
                <LoadingRoutes />
            }
            {!userDataLoading && !user &&
                <Outlet />
            }
            {!userDataLoading && user &&
                <Navigate to="/admin" />
            }
        </>
    )
}

export default function Routes() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <NavigationProvider />,
            errorElement: <ErrorBoundary />,
            children: [
                {
                    path: "/",
                    element: <Home />
                },
                {
                    path: "/",
                    element: <AuthenticationRoutes />,
                    children: [
                        {
                            path: "/",
                            element: <Auth />,
                            children: [
                                {
                                    path: "/login",
                                    index: true,
                                    element: <UserLogin />
                                },
                                {
                                    path: "/signup",
                                    element: <UserSignUp />
                                },
                                {
                                    path: "attendant/login",
                                    element: <AttendantLogin />
                                },
                                {
                                    path: "attendant/join",
                                    element: <AttendantJoin />
                                },
                            ]
                        },
                    ]
                },
                {
                    path: "/",
                    element: <ProtectedRoute />,
                    children: [
                        {
                            path: "/",
                            element: <Main />,
                            children: [
                                {
                                    path: "/admin",
                                    children: [
                                        {
                                            path: "/admin",
                                            element: <Dashboard />,
                                            index: true
                                        },
                                        {
                                            path: "/admin/events",
                                            element: <Events />
                                        }
                                    ]
                                },
                                {
                                    path: "/clients",
                                    element: <Clients />
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ])

    return (
        <RouterProvider router={router} />
    )
}