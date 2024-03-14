import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, useMediaQuery } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useNavigationContext } from "../../context/Navigation"

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

const NavigationButtonSmall = styled(ListItemButton)(({ theme }) => ({
    flexGrow: 0,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
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
    const isSmall = useMediaQuery("(max-width: 1180px)")

    return (
        <StyledSection
            className={`flex flex-col h-full p-4 ${isSmall ? "w-fit" : "w-64"}`}
        >
            <h1
                className={`${isSmall ? "text-sm" : "text-2xl"} font-bold`}
            >
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
                            {isSmall ?
                                <NavigationButtonSmall
                                    className="rounded-lg"
                                    selected={item.active}
                                    onClick={() => navigate(item.path)}
                                >
                                    {item.icon}
                                </NavigationButtonSmall>
                                :
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
                            }
                        </ListItem>
                    ))}
                </List>
            </nav>
        </StyledSection>
    )
}