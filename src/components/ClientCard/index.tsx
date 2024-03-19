import { EditOutlined, MoreVertOutlined, VisibilityOutlined } from "@mui/icons-material";
import { Avatar, Card, CardActionArea, CardHeader, IconButton, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { IClientCardMenuOption, IClientCardProps } from "../../types/components/ClientCard";
import getColorFromString from "../../util/getColorFromString";
import getInitials from "../../util/getInitials";
import getTruncatedText from "../../util/getTruncatedText";
import ClientCardMenu from "./Menu";

export default function ClientCard({
    client,
    openViewModal,
    openEditModal
}: IClientCardProps) {

    const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null)

    const menuOptions: IClientCardMenuOption[] = [
        {
            label: "Visualizar",
            icon: <VisibilityOutlined />,
            onClick: () => openViewModal()
        },
        {
            label: "Editar",
            icon: <EditOutlined />,
            onClick: () => openEditModal()
        }
    ]

    function handleMenuOpen(event: React.MouseEvent<HTMLElement>) {
        event.stopPropagation()
        setMenuAnchor(event.currentTarget)
    }

    function handleMenuClose() {
        setMenuAnchor(null)

        if (document.getElementById("client-card-menu-anchor")) {
            document.getElementById("client-card-menu-anchor")?.remove()
        }
    }

    function handleContextMenu(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault()

        const anchor = document.createElement("div")
        anchor.id = "client-card-menu-anchor"
        document.body.appendChild(anchor)
        anchor.style.position = "fixed"
        anchor.style.top = `${event.clientY}px`
        anchor.style.left = `${event.clientX}px`
        setMenuAnchor(anchor)
    }

    return (
        <Card
            variant="outlined"
        >
            <CardActionArea
                onClick={() => openViewModal()}
                onContextMenu={handleContextMenu}
            >
                <CardHeader
                    avatar={
                        <Avatar
                            alt={client.name}
                            sx={{
                                bgcolor: getColorFromString(client.name)
                            }}
                        >
                            {getInitials(client.name)}
                        </Avatar>
                    }
                    title={
                        <Typography
                            variant="h3"
                            className="font-bold text-base"
                        >
                            {getTruncatedText(client.name, 16)}
                        </Typography>
                    }
                    subheader={
                        <Typography
                            className="text-xs"
                        >
                            {getTruncatedText(client.email, 22)}
                        </Typography>
                    }
                    action={
                        <Tooltip
                            title="Opções"
                            arrow
                        >
                            <IconButton
                                onClick={handleMenuOpen}
                                size="small"
                            >
                                <MoreVertOutlined fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    }
                />
            </CardActionArea>
            <ClientCardMenu
                options={menuOptions}
                anchorEl={menuAnchor}
                onClose={handleMenuClose}
            />
        </Card>
    )
}