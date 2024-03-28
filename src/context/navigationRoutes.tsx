import { CalendarMonthOutlined, GroupsOutlined, SpaceDashboardOutlined } from "@mui/icons-material"
import { NavigationItemsType } from "../types/context/Navigation"

export const navigationRoutes: NavigationItemsType = {
    "admin": [
        {
            icon: <SpaceDashboardOutlined />,
            label: "Dashboard",
            path: "/admin",
        },
        {
            icon: <CalendarMonthOutlined />,
            label: "Eventos",
            path: "/admin/events",
        },
        {
            icon: <GroupsOutlined />,
            label: "Clientes",
            path: "/admin/clients",
        }
    ],
    "attendant": [
        {
            icon: <SpaceDashboardOutlined />,
            label: "Dashboard",
            path: "/attendant",
        },
        {
            icon: <CalendarMonthOutlined />,
            label: "Eventos",
            path: "/attendant/events",
        }
    ]
}