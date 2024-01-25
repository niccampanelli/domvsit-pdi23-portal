import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Admin from "./admin"
import Auth from "./auth"
import Clients from "./clients"
import UserSignUp from "./auth/user/signup"
import UserLogin from "./auth/user/login"
import Home from "./home"
import AttendantLogin from "./auth/attendant/login"
import AttendantJoin from "./auth/attendant/join"

export default function Routes() {

    const router = createBrowserRouter([
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
            path: "/admin",
            element: <Admin />
        },
        {
            path: "/clients",
            element: <Clients />
        }
    ])

    return (
        <RouterProvider router={router} />
    )
}