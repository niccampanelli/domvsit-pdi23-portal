import { Check, Close, EventAvailableOutlined, EventBusyOutlined } from "@mui/icons-material";
import { Avatar, Badge, Button, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Skeleton, Tooltip, Typography } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/Auth";
import { useToastsContext } from "../../context/Toasts";
import clientService from "../../services/clientService";
import eventService from "../../services/eventService";
import { IEventViewModalProps } from "../../types/components/EventViewModal";
import { isAttendant } from "../../types/context/User";
import { IGetAttendantByIdResponse, IGetClientByIdResponse } from "../../types/services/clientService";
import getColorFromString from "../../util/getColorFromString";
import { getErrorMessageOrDefault } from "../../util/getErrorMessageOrDefault";
import getInitials from "../../util/getInitials";
import EventViewModalAttendantsLoading from "./AttendantsLoading";
import EventViewModalLinkChip from "./LinkChip";

export default function EventViewModal({
    open,
    onClose,
    event,
    actionButton,
    refreshData
}: IEventViewModalProps) {

    const { addToast } = useToastsContext()
    const { user } = useAuthContext()

    const [client, setClient] = useState<IGetClientByIdResponse | undefined>()
    const [attendants, setAttendants] = useState<IGetAttendantByIdResponse[]>([])
    const [clientLoading, setClientLoading] = useState(false)
    const [attendantsLoading, setAttendantsLoading] = useState(false)
    const [acceptLoading, setAcceptLoading] = useState(false)

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

    async function handleAccept() {
        setAcceptLoading(true)

        try {
            await eventService.accept(event!.id, {
                attendantId: user!.id
            })

            const accepted = didUserAccept()

            addToast({
                title: accepted ? "Você cancelou sua presença" : "Você confirmou presença!",
                message: accepted ? "Você não participará mais deste evento" : "Você confirmou presença neste evento",
                type: "success"
            })

            onClose()
            refreshData?.()
        }
        catch (error) {
            const message = getErrorMessageOrDefault(error)
            addToast({
                title: "Erro ao aceitar o evento",
                message,
                type: "error"
            })
        }
        finally {
            setAcceptLoading(false)
        }
    }

    async function handleShowUp() {
        try {
            await eventService.showUp(event!.id, {
                showedUp: true,
                attendantId: user!.id
            })

            onClose()
            refreshData?.()
        }
        catch (error) {
            const message = getErrorMessageOrDefault(error)
            console.error(message)
        }
    }

    function didUserAccept() {
        return event?.eventAttendants.find(attendant => attendant.attendantId === user?.id)?.accepted
    }

    function didAttendantAccept(attendantId: number) {
        return event?.eventAttendants.find(attendant => attendant.attendantId === attendantId)?.accepted
    }

    function didAttendantShowUp(attendantId: number) {
        return event?.eventAttendants.find(attendant => attendant.attendantId === attendantId)?.showedUp
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
                    borderTop: `8px solid ${event?.status ? theme.palette.primary.main : theme.palette.grey[400]}`,
                })
            }}
        >
            <DialogTitle>
                {event?.title}
            </DialogTitle>
            <DialogContent className="flex flex-col items-start gap-4">
                <div className="flex flex-col items-start gap-2">
                    {event?.status == false &&
                        <Chip
                            label="Evento desmarcado"
                            color="default"
                        />
                    }
                    <Chip
                        label={moment(event?.ocurrence).format("dddd, DD [de] MMMM [de] YYYY [às] HH:mm").replace(/^[a-z]/, (c) => c.toUpperCase())}
                        color={event?.status ? "primary" : "default"}
                    />
                </div>
                <Typography className="whitespace-pre-line">
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
                                <Badge
                                    key={attendant.id}
                                    overlap="circular"
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "right"
                                    }}
                                    badgeContent={
                                        moment().isAfter(moment(event?.ocurrence).subtract(1, "hour")) ?
                                            didAttendantShowUp(attendant.id) ?
                                                <Tooltip
                                                    title="Compareceu"
                                                    arrow
                                                >
                                                    <Avatar
                                                        alt={attendant.name}
                                                        sx={{
                                                            bgcolor: "success.main",
                                                            width: 20,
                                                            height: 20
                                                        }}
                                                    >
                                                        <EventAvailableOutlined className="w-4 h-4" />
                                                    </Avatar>
                                                </Tooltip>
                                                :
                                                <Tooltip
                                                    title="Não compareceu"
                                                    arrow
                                                >
                                                    <Avatar
                                                        alt={attendant.name}
                                                        sx={{
                                                            bgcolor: "error.main",
                                                            width: 20,
                                                            height: 20
                                                        }}
                                                    >
                                                        <EventBusyOutlined className="w-4 h-4" />
                                                    </Avatar>
                                                </Tooltip>
                                            :
                                            didAttendantAccept(attendant.id) ?
                                                <Tooltip
                                                    title="Confirmado"
                                                    arrow
                                                >
                                                    <Avatar
                                                        alt={attendant.name}
                                                        sx={{
                                                            bgcolor: "success.main",
                                                            width: 20,
                                                            height: 20
                                                        }}
                                                    >
                                                        <Check className="w-4 h-4" />
                                                    </Avatar>
                                                </Tooltip>
                                                :
                                                <Tooltip
                                                    title="Não confirmado"
                                                    arrow
                                                >
                                                    <Avatar
                                                        alt={attendant.name}
                                                        sx={{
                                                            bgcolor: "error.main",
                                                            width: 20,
                                                            height: 20
                                                        }}
                                                    >
                                                        <Close className="w-4 h-4" />
                                                    </Avatar>
                                                </Tooltip>
                                    }

                                >
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
                                </Badge>
                            ))}
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <Typography className="font-bold">
                        Cliente
                    </Typography>
                    <div className="flex items-center gap-2">
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
                        <Typography className="font-bold">
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
                <div className="flex flex-col gap-2">
                    <Typography className="font-bold">
                        {event?.link ? "Link associado" : "Nenhum link associado"}
                    </Typography>
                    {event?.link &&
                        <EventViewModalLinkChip
                            link={event.link}
                            isOcurring={
                                moment().isBetween(
                                    moment(event.ocurrence).subtract(1, "hour"),
                                    moment(event.ocurrence).add(1, "hour")
                                )
                            }
                            clickCallback={isAttendant(user) ? handleShowUp : undefined}
                        />
                    }
                </div>
                <Divider className="w-full" />
                {(event?.tags?.length ?? 0) > 0 &&
                    <div className="flex flex-wrap gap-2">
                        {event?.tags?.map(tag => (
                            <Chip
                                key={tag}
                                label={tag}
                                size="small"
                            />
                        ))}
                    </div>
                }
                <Typography variant="caption">
                    {moment(event?.createdAt).format("[Criado em] DD/MM/YYYY [às] HH:mm")} | {moment(event?.updatedAt).format("[Última atualização em] DD/MM/YYYY [às] HH:mm")}
                </Typography>
            </DialogContent>
            {isAttendant(user) && moment().isBefore(moment(event?.ocurrence).subtract(1, "hour")) &&
                event?.eventAttendants.some(attendant => attendant.attendantId === user.id) &&
                <DialogActions>
                    <Button
                        fullWidth
                        type="submit"
                        disabled={acceptLoading}
                        onClick={handleAccept}
                    >
                        {acceptLoading ?
                            <CircularProgress size={24} color="inherit" />
                            :
                            didUserAccept() ?
                                "Cancelar presença"
                                :
                                "Confirmar presença"
                        }
                    </Button>
                </DialogActions>
            }
            <div className="flex flex-col gap-4 fixed bottom-8 right-8">
                {actionButton}
            </div>
        </Dialog>
    )
}