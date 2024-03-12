import { EditOutlined, LinkOutlined } from "@mui/icons-material";
import { Avatar, Chip, Dialog, DialogContent, DialogTitle, Divider, Fab, Skeleton, Tooltip, Typography, styled } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { useToastsContext } from "../../context/Toasts";
import clientService from "../../services/clientService";
import { IEventViewModalProps } from "../../types/components/EventViewModal";
import { IGetAttendantByIdResponse, IGetClientByIdResponse } from "../../types/services/clientService";
import getColorFromString from "../../util/getColorFromString";
import { getErrorMessageOrDefault } from "../../util/getErrorMessageOrDefault";
import getInitials from "../../util/getInitials";
import EventViewModalAttendantsLoading from "./attendantsLoading";

export default function EventViewModal({
    open,
    onClose,
    event,
    openEditModal
}: IEventViewModalProps) {

    const { addToast } = useToastsContext()

    const [client, setClient] = useState<IGetClientByIdResponse | undefined>()
    const [attendants, setAttendants] = useState<IGetAttendantByIdResponse[]>([])
    const [clientLoading, setClientLoading] = useState(false)
    const [attendantsLoading, setAttendantsLoading] = useState(false)

    async function fetchClient() {
        setClientLoading(true)

        try {
            const data = await clientService.getClientById(event!.clientId)

            setClient(data)
        }
        catch (error) {
            const message = getErrorMessageOrDefault(error)
            addToast({
                title: "Erro ao buscar o cliente",
                message,
                type: "error"
            })
        }
        finally {
            setClientLoading(false)
        }
    }

    async function fetchAttendants() {
        setAttendantsLoading(true)

        try {
            var attendants: IGetAttendantByIdResponse[] = []

            for (const attendant of event!.eventAttendants) {
                const data = await clientService.getAttendantById(attendant.attendantId)
                attendants.push(data)
            }

            setAttendants(attendants)
        }
        catch (error) {
            const message = getErrorMessageOrDefault(error)
            addToast({
                title: "Erro ao buscar os participantes",
                message,
                type: "error"
            })
        }
        finally {
            setAttendantsLoading(false)
        }
    }

    function handleOpenEditModal() {
        onClose()
        openEditModal!(event)
    }

    useEffect(() => {
        if (event) {
            if (event.clientId)
                fetchClient()
            if (event.eventAttendants.length > 0)
                fetchAttendants()
        }
    }, [event])

    return (
        <Dialog
            maxWidth="xs"
            fullWidth
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: theme => ({
                    borderTop: `8px solid ${theme.palette.primary.main}`
                })
            }}
        >
            <DialogTitle>
                {event?.title}
            </DialogTitle>
            <DialogContent className="flex flex-col items-start gap-4">
                <div>
                    <Chip
                        label={moment(event?.ocurrence).format("dddd, DD [de] MMMM [de] YYYY [às] HH:mm").replace(/^[a-z]/, (c) => c.toUpperCase())}
                        color="primary"
                    />
                </div>
                <Typography>
                    {event?.description}
                </Typography>
                <div
                    className="flex flex-col gap-2"
                >
                    <Typography
                        className="font-bold"
                    >
                        Participantes
                    </Typography>
                    <div
                        className="flex flex-wrap gap-1"
                    >
                        {attendantsLoading ?
                            <EventViewModalAttendantsLoading />
                            :
                            attendants.map(attendant => (
                                <Tooltip
                                    title={attendant.name}
                                    arrow
                                >
                                    <Avatar
                                        alt={attendant.name}
                                        sx={{
                                            bgcolor: getColorFromString(attendant.name),
                                            fontSize: 14,
                                            width: 32,
                                            height: 32
                                        }}
                                    >
                                        {getInitials(attendant.name)}
                                    </Avatar>
                                </Tooltip>
                            ))}
                    </div>
                </div>
                <div
                    className="flex flex-col gap-2"
                >
                    <Typography
                        className="font-bold"
                    >
                        Cliente
                    </Typography>
                    <div
                        className="flex items-center gap-2"
                    >
                        {clientLoading ?
                            <Skeleton
                                variant="circular"
                                width={32}
                                height={32}
                            />
                            :
                            <Avatar
                                alt={client?.name}
                                sx={{
                                    bgcolor: getColorFromString(client?.name || ""),
                                    fontSize: 14,
                                    width: 32,
                                    height: 32
                                }}
                            >
                                {getInitials(client?.name || "")}
                            </Avatar>
                        }
                        <Typography
                            className="font-bold"
                        >
                            {clientLoading ?
                                <Skeleton
                                    variant="text"
                                    width={140}
                                />
                                :
                                client?.name
                            }
                        </Typography>
                    </div>
                </div>
                <div
                    className="flex flex-col gap-2"
                >
                    <Typography
                        className="font-bold"
                    >
                        Link associado
                    </Typography>
                    {event?.link &&
                        <Tooltip
                            title="O evento ocorrerá neste link"
                            arrow
                        >
                            <Chip
                                icon={
                                    <LinkOutlined />
                                }
                                label={event?.link}
                                clickable
                                component="a"
                                href={event?.link}
                                target="_blank"
                                rel="noopener noreferrer"
                            />
                        </Tooltip>
                    }
                </div>
                <Divider
                    className="w-full"
                />
                {(event?.tags?.length ?? 0) > 0 &&
                    <div
                        className="flex flex-wrap gap-2"
                    >
                        {event?.tags?.map(tag => (
                            <Chip
                                key={tag}
                                label={tag}
                                size="small"
                            />
                        ))}
                    </div>
                }
                <Typography
                    variant="caption"
                >
                    {moment(event?.createdAt).format("[Criado em] DD/MM/YYYY [às] HH:mm")} | {moment(event?.updatedAt).format("[Última atualização em] DD/MM/YYYY [às] HH:mm")}
                </Typography>
            </DialogContent>
            {openEditModal &&
                <Tooltip
                    title="Editar evento"
                    placement="left"
                    arrow
                >
                    <Fab
                        className="fixed bottom-8 right-8"
                        onClick={handleOpenEditModal}
                    >
                        <EditOutlined />
                    </Fab>
                </Tooltip>
            }
        </Dialog>
    )
}