import { CheckCircleOutline, Close, Person2Outlined } from "@mui/icons-material";
import { Avatar, Card, CardActionArea, CardHeader, Dialog, DialogContent, Divider, IconButton, InputAdornment, List, TextField, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useToastsContext } from "../../context/Toasts";
import clientService from "../../services/clientService";
import { IAttendantSearchModalProps } from "../../types/components/AttendantSearchModal";
import { IListAttendantResponseItem } from "../../types/services/clientService";
import getColorFromString from "../../util/getColorFromString";
import { getErrorMessageOrDefault } from "../../util/getErrorMessageOrDefault";
import getInitials from "../../util/getInitials";

export default function AttendantSearchModal({
    open,
    onClose,
    clientId,
    selected,
    onSelect
}: IAttendantSearchModalProps) {

    const { addToast } = useToastsContext()

    const [search, setSearch] = useState("")
    const [searchTimeout, setSearchTimeout] = useState<number | undefined>()
    const [attendants, setAttendants] = useState<IListAttendantResponseItem[]>([])
    const [selectedAttendants, setSelectedAttendants] = useState<IListAttendantResponseItem[]>(selected || [])

    async function fetchAttendants() {
        try {
            const data = await clientService.listAttendant({
                page: 1,
                limit: 10,
                search,
                clientId
            })

            setAttendants(data.data)
        }
        catch (error) {
            const message = getErrorMessageOrDefault(error)

            addToast({
                title: "Erro ao buscar os participantes",
                message,
                type: "error"
            })
        }
    }

    function handleAttendantSelection(attendant: IListAttendantResponseItem) {
        if (selectedAttendants.find(item => item.id === attendant.id)) {
            setSelectedAttendants(previous => {
                const index = previous.findIndex(item => item.id === attendant.id)
                onSelect?.([...previous.slice(0, index), ...previous.slice(index + 1)])
                return [...previous.slice(0, index), ...previous.slice(index + 1)]
            })
        }
        else {
            setSelectedAttendants(previous => {
                onSelect?.([...previous, attendant])
                return [...previous, attendant]
            })
        }
    }

    useEffect(() => {
        if (searchTimeout)
            clearTimeout(searchTimeout)

        setSearchTimeout(
            setTimeout(() => {
                fetchAttendants()
            }, 500)
        )
    }, [search])

    useEffect(() => {
        if (open) {
            fetchAttendants()
        }
    }, [open])

    return (
        <Dialog maxWidth="xs" fullWidth open={open} onClose={onClose}>
            <DialogContent className="flex flex-col gap-4">
                <TextField
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Buscar participantes"
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Person2Outlined />
                            </InputAdornment>
                        )
                    }}
                />
                {selectedAttendants.length > 0 &&
                    <div
                        className="flex flex-col gap-2"
                    >
                        <Typography
                            className="font-bold"
                        >
                            Participantes selecionados
                        </Typography>
                        <div className="flex flex-wrap gap-1">
                            {selectedAttendants.map(attendant => (
                                <Tooltip
                                    key={attendant.id}
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
                            <Tooltip
                                title="Remover todos"
                                arrow
                            >
                                <IconButton
                                    size="small"
                                    onClick={() => {
                                        setSelectedAttendants([])
                                        onSelect?.([])
                                    }}
                                >
                                    <Close />
                                </IconButton>
                            </Tooltip>
                        </div>
                        <Typography
                            className="text-xs"
                        >
                            {selectedAttendants.map(attendant => attendant.name).join(", ")}
                        </Typography>
                    </div>
                }
                {selectedAttendants.length > 0 &&
                    <Divider />
                }
                <List
                    className="px-4 -mx-4"
                    sx={{
                        maxHeight: 400,
                        overflowY: "auto"
                    }}
                >
                    {attendants.length === 0 ?
                        <Typography
                            className="text-sm"
                        >
                            Nenhum participante encontrado
                        </Typography>
                        :
                        attendants.map(attendant => (
                            <Card
                                variant="outlined"
                                key={attendant.id}
                                onClick={() => handleAttendantSelection(attendant)}
                                className="mb-2"
                            >
                                <CardActionArea>
                                    <CardHeader
                                        avatar={
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
                                        }
                                        title={
                                            <Typography
                                                variant="h3"
                                                className="font-bold text-sm"
                                            >
                                                {attendant.name}
                                            </Typography>
                                        }
                                        subheader={
                                            <Typography
                                                className="text-xs"
                                            >
                                                {attendant.role}
                                            </Typography>
                                        }
                                        action={
                                            selectedAttendants.find(item => item.id === attendant.id) ?
                                                <CheckCircleOutline color="primary" />
                                                :
                                                null
                                        }
                                        sx={{
                                            "& .MuiCardHeader-action": {
                                                alignSelf: "center"
                                            }
                                        }}
                                    />
                                </CardActionArea>
                            </Card>
                        ))
                    }
                </List>
            </DialogContent>
        </Dialog>
    )
}