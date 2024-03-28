import { DeleteOutlined, EditOutlined, LinkOutlined, MoreVertOutlined, VisibilityOutlined } from "@mui/icons-material"
import { Card, CardActionArea, CardContent, Chip, IconButton, Tooltip, Typography, styled } from "@mui/material"
import moment from "moment"
import { useState } from "react"
import { IEventCardMenuOption, IEventCardProps } from "../../types/components/EventCard"
import getTruncatedText from "../../util/getTruncatedText"
import EventCardMenu from "./Menu"
import { isUser } from "../../types/context/User"
import { useAuthContext } from "../../context/Auth"

const StyledCard = styled(Card)(({ theme }) => ({
    borderTop: `8px solid ${theme.palette.primary.main}`
}))

export default function EventCard({
    event,
    onClick = () => { },
    openViewModal,
    openEditModal,
    openDeleteModal,
    showMenu = false,
}: IEventCardProps) {

    const { user } = useAuthContext()

    const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null)

    const menuOptions: IEventCardMenuOption[] = [
        {
            label: "Visualizar",
            icon: <VisibilityOutlined />,
            onClick: () => openViewModal?.()
        },
        {
            divider: true
        },
        {
            icon: <LinkOutlined />,
            label: "Abrir link",
            onClick: () => window.open(event.link, "_blank")
        }
    ]

    if (isUser(user))
        menuOptions.splice(1, 0,
            {
                label: "Editar",
                icon: <EditOutlined />,
                onClick: () => openEditModal?.()
            },
            {
                label: "Excluir",
                icon: <DeleteOutlined />,
                onClick: () => openDeleteModal?.()
            }
        )

    function handleMenuOpen(event: React.MouseEvent<HTMLElement>) {
        if (!showMenu) return

        event.stopPropagation()
        setMenuAnchor(event.currentTarget)
    }

    function handleMenuClose() {
        setMenuAnchor(null)

        if (document.getElementById("event-card-menu-anchor")) {
            document.getElementById("event-card-menu-anchor")?.remove()
        }
    }

    function handleContextMenu(event: React.MouseEvent<HTMLElement>) {
        if (!showMenu) return

        event.preventDefault()

        const anchor = document.createElement("div")
        anchor.id = "event-card-menu-anchor"
        document.body.appendChild(anchor)
        anchor.style.position = "fixed"
        anchor.style.top = `${event.clientY}px`
        anchor.style.left = `${event.clientX}px`
        setMenuAnchor(anchor)
    }

    function getFormattedOcurrence(ocurrence: Date) {
        return moment(ocurrence).format("ddd, DD [de] MMM")
    }

    return (
        <StyledCard
            variant="outlined"
        >
            <CardActionArea
                onClick={onClick}
                onContextMenu={handleContextMenu}
            >
                <CardContent>
                    <div className="flex flex-row items-center gap-2 mb-4">
                        <Chip
                            label={getFormattedOcurrence(event.ocurrence)}
                            color="primary"
                            size="small"
                        />
                        {event.link &&
                            <Chip
                                icon={<LinkOutlined />}
                                label="Link"
                                size="small"
                            />
                        }
                        {showMenu &&
                            <Tooltip
                                title="Opções"
                                arrow
                            >
                                <IconButton
                                    className="mr-0 ml-auto"
                                    onClick={handleMenuOpen}
                                    size="small"
                                >
                                    <MoreVertOutlined fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        }
                    </div>
                    <Typography
                        variant="h3"
                        className="text-lg font-bold mb-2"
                    >
                        {event.title}
                    </Typography>
                    <Typography>
                        {getTruncatedText(event.description, 60)}
                    </Typography>
                    {event.tags &&
                        <div className="flex flex-row flex-wrap gap-2 mt-4">
                            {event.tags.map(tag =>
                                <Chip
                                    key={tag}
                                    label={tag}
                                    size="small"
                                />
                            )}
                        </div>
                    }
                </CardContent>
            </CardActionArea>
            <EventCardMenu
                options={menuOptions}
                anchorEl={menuAnchor}
                onClose={handleMenuClose}
            />
        </StyledCard>
    )
}