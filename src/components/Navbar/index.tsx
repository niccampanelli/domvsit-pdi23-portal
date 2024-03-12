import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled } from "@mui/material"
import { useNavigationContext } from "../../context/Navigation"
import { useNavigate } from "react-router-dom"

const StyledSection = styled("section")(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    borderRight: `1px solid ${theme.palette.divider}`,
}))

const NavigationButton = styled(ListItemButton)(({ theme }) => ({
    "&.Mui-selected": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        "&:hover": {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.contrastText,
        },
        "& .MuiListItemIcon-root": {
            color: theme.palette.primary.contrastText,
        },
    }
}))

export default function Navbar() {

    const { navigationItems } = useNavigationContext()
    const navigate = useNavigate()

    return (
        <StyledSection
            className="flex flex-col h-full w-72 p-4"
        >
            <h1>
                Planify
            </h1>
            <nav>
                <List
                    className="flex flex-col gap-2"
                >
                    {navigationItems.map(item => (
                        <ListItem
                            key={item.label}
                            disablePadding
                        >
                            <NavigationButton
                                className="rounded-lg"
                                selected={item.active}
                                onClick={() => navigate(item.path)}
                            >
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.label}
                                />
                            </NavigationButton>
                        </ListItem>
                    ))}
                </List>
            </nav>
        </StyledSection>
    )
}