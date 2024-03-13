import { ExitToAppOutlined, Person2Outlined } from "@mui/icons-material"
import { Avatar, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip, Typography, styled } from "@mui/material"
import { useAuthContext } from "../../context/Auth"
import { useState } from "react"
import { useNavigationContext } from "../../context/Navigation"

const StyledHeader = styled("header")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
    position: "sticky",
    top: 0,
    zIndex: 10,
}))

export default function Header() {

    const { user, logout } = useAuthContext()
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
        <StyledHeader
            className="flex justify-between items-center p-4"
        >
            <Typography
                variant="h1"
                className="text-2xl font-bold"
            >
                {currentNavigation?.label}
            </Typography>
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
                <MenuItem onClick={() => logout()}>
                    <ListItemIcon>
                        <ExitToAppOutlined />
                    </ListItemIcon>
                    <ListItemText
                        primary="Sair"
                    />
                </MenuItem>
            </Menu>
        </StyledHeader>
    )
}