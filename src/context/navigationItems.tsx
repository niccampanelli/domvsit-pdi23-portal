import Dashboard from "../assets/icons/dashboard.svg?react";
import Face from "../assets/icons/face.svg?react";
import Calendar from "../assets/icons/calendar.svg?react";
import { INavigationItems } from "../types/context/Navigation";

export const navigationRoutes: INavigationItems = {
    "admin": [
        {
            icon: Dashboard,
            name: "Dashboard",
            path: "/admin"
        },
        {
            icon: Face,
            name: "Clientes",
            path: "/admin/clients"
        },
        {
            icon: Calendar,
            name: "Eventos",
            path: "/admin/events"
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