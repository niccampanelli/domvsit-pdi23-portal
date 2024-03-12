import { CalendarMonthOutlined, FaceOutlined, SpaceDashboardOutlined } from "@mui/icons-material"
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
            icon: <FaceOutlined />,
            label: "Clientes",
            path: "/admin/clients",
        }
    ]
}