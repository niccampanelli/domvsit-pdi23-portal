import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Admin from "./admin"
import Auth from "./auth"
import Clients from "./clients"
import SignUp from "./auth/signup"
import Login from "./auth/login"

export default function Routes() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Admin />
        },
        {
            path: "/",
            element: <Auth />,
            children: [
                {
                    path: "/login",
                    index: true,
                    element: <Login />
                },
                {
                    path: "/signup",
                    element: <SignUp />
                }
            ]
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