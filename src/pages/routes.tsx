import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Admin from "./admin";
import Auth from "./auth";
import Clients from "./clients";

export default function Routes() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Admin/>
        },
        {
            path: "/auth",
            element: <Auth/>
        },
        {
            path: "/clients",
            element: <Clients/>
        }
    ])

    return (
        <RouterProvider router={router}/>
    )
}