import { CalendarMonthOutlined, DashboardOutlined, FaceOutlined } from "@mui/icons-material"
import { NavigationItemsType } from "../types/context/Navigation"

export const navigationRoutes: NavigationItemsType = {
    "admin": [
        {
            icon: <DashboardOutlined />,
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