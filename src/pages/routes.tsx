import { Navigate, Outlet, RouterProvider, createBrowserRouter } from "react-router-dom"
import Admin from "./main/admin"
import Auth from "./auth"
import Clients from "./main/clients"
import UserSignUp from "./auth/user/signup"
import UserLogin from "./auth/user/login"
import Home from "./home"
import AttendantLogin from "./auth/attendant/login"
import AttendantJoin from "./auth/attendant/join"
import Main from "./main"
import NavigationProvider from "../context/Navigation"
import { useAuthContext } from "../context/Auth"

function ProtectedRoute() {

    const { user } = useAuthContext()

    if (!user) {
        return <Navigate
            replace
            to="/attendant/login"
        />
    }

    return <Outlet />
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
                                    index: true,
                                    element: <Admin />
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