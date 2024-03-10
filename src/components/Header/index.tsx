import { ExitToAppOutlined, Person2Outlined } from "@mui/icons-material"
import { Avatar, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip } from "@mui/material"
import { useAuthContext } from "../../context/Auth"
import { useState } from "react"
import { useNavigationContext } from "../../context/Navigation"

export default function Header() {

    const { user } = useAuthContext()
    const { currentNavigation } = useNavigationContext()

    const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)
    const menuOpen = Boolean(menuAnchor)

    function handleMenuOpen(event: React.MouseEvent<HTMLElement>) {
        setMenuAnchor(event.currentTarget)
    }

    function handleMenuClose() {
        setMenuAnchor(null)
    }

    return (
        <header
            className="flex justify-between items-center p-4"
        >
            <h1>
                {currentNavigation?.label}
            </h1>
            <Tooltip
                title={user?.name}
                arrow
            >
                <IconButton
                    onClick={handleMenuOpen}
                >
                    <Avatar
                        alt={user?.name}
                        sx={{
                            backgroundColor: "transparent",
                            color: "text.primary",
                            border: "1px solid",
                        }}
                    >
                        <Person2Outlined />
                    </Avatar>
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={menuAnchor}
                open={menuOpen}
                onClose={handleMenuClose}
                slotProps={{
                    paper: {
                        elevation: 1
                    }
                }}
                MenuListProps={{
                    dense: true
                }}
            >
                <MenuItem>
                    <ListItemIcon>
                        <Person2Outlined />
                    </ListItemIcon>
                    <ListItemText
                        primary={user?.name || "Nome do usuário"}
                    />
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <ExitToAppOutlined />
                    </ListItemIcon>
                    <ListItemText
                        primary="Sair"
                    />
                </MenuItem>
            </Menu>
        </header>
    )
}