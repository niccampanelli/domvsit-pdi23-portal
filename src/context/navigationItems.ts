import { INavigationItems } from "../types/context/Navigation";

export const navigationRoutes: INavigationItems = {
    "admin": [
        {
            name: "Dashboard",
            path: "/admin"
        },
        {
            name: "Clients",
            path: "/admin/clients"
        },
        {
            name: "Users",
            path: "/admin/users"
        }
    ],
    "clients": [
        {
            name: "Dashboard",
            path: "/clients"
        },
        {
            name: "Users",
            path: "/clients/users"
        }
    ]
}