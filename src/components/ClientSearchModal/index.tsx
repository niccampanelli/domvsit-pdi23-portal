import { CheckCircleOutline, Close, FaceOutlined } from "@mui/icons-material";
import { Avatar, Card, CardActionArea, CardHeader, Dialog, DialogContent, Divider, IconButton, InputAdornment, List, TextField, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useToastsContext } from "../../context/Toasts";
import clientService from "../../services/clientService";
import { IClientSearchModalProps } from "../../types/components/ClientSearchModal";
import { IListClientResponseItem } from "../../types/services/clientService";
import getColorFromString from "../../util/getColorFromString";
import { getErrorMessageOrDefault } from "../../util/getErrorMessageOrDefault";
import getInitials from "../../util/getInitials";

export default function ClientSearchModal({
    open,
    onClose,
    selected,
    onSelect
}: IClientSearchModalProps) {

    const { addToast } = useToastsContext()

    const [search, setSearch] = useState("")
    const [searchTimeout, setSearchTimeout] = useState<number | undefined>()
    const [clients, setClients] = useState<IListClientResponseItem[]>([])
    const [selectedClient, setSelectedClient] = useState<IListClientResponseItem | undefined>(selected)

    async function fetchClients() {
        try {
            const data = await clientService.listClient({
                page: 1,
                limit: 10,
                search
            })

            setClients(data.data)
        }
        catch (error) {
            const message = getErrorMessageOrDefault(error)

            addToast({
                title: "Erro ao buscar os clientes",
                message,
                type: "error"
            })
        }
    }

    function handleClientSelection(client: IListClientResponseItem) {
        if (selectedClient?.id === client.id) {
            setSelectedClient(undefined)
            onSelect?.(undefined)
        }
        else {
            setSelectedClient(client)
            onSelect?.(client)
        }
    }

    useEffect(() => {
        if (searchTimeout)
            clearTimeout(searchTimeout)

        setSearchTimeout(
            setTimeout(() => {
                fetchClients()
            }, 500)
        )
    }, [search])

    return (
        <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
            <DialogContent className="flex flex-col gap-4">
                <TextField
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Buscar cliente"
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <FaceOutlined />
                            </InputAdornment>
                        )
                    }}
                />
                {selectedClient &&
                    <div
                        className="flex flex-col gap-2"
                    >
                        <Typography
                            className="font-bold"
                        >
                            Cliente selecionado
                        </Typography>
                        <Card
                            variant="outlined"
                        >
                            <CardHeader
                                avatar={
                                    <Avatar
                                        alt={selectedClient.name}
                                        sx={{
                                            bgcolor: getColorFromString(selectedClient.name),
                                            fontSize: 14,
                                            width: 32,
                                            height: 32
                                        }}
                                    >
                                        {getInitials(selectedClient.name)}
                                    </Avatar>
                                }
                                title={
                                    <Typography
                                        variant="h3"
                                        className="font-bold text-sm"
                                    >
                                        {selectedClient.name}
                                    </Typography>
                                }
                                subheader={
                                    <Typography
                                        className="text-xs"
                                    >
                                        {selectedClient.email}
                                    </Typography>
                                }
                                action={
                                    <Tooltip
                                        title="Desfazer seleção"
                                        arrow
                                    >
                                        <IconButton
                                            onClick={() => handleClientSelection(selectedClient)}
                                        >
                                            <Close />
                                        </IconButton>
                                    </Tooltip>
                                }
                            />
                        </Card>
                    </div>
                }
                {selectedClient &&
                    <Divider />
                }
                <List
                    className="px-4 -mx-4"
                    sx={{
                        maxHeight: 400,
                        overflowY: "auto"
                    }}
                >
                    {clients.length === 0 ?
                        <Typography
                            className="text-sm"
                        >
                            Nenhum cliente encontrado
                        </Typography>
                        :
                        clients.map(client => (
                            <Card
                                variant="outlined"
                                key={client.id}
                                onClick={() => handleClientSelection(client)}
                                className="mb-2"
                            >
                                <CardActionArea>
                                    <CardHeader
                                        avatar={
                                            <Avatar
                                                alt={client.name}
                                                sx={{
                                                    bgcolor: getColorFromString(client.name),
                                                    fontSize: 14,
                                                    width: 32,
                                                    height: 32
                                                }}
                                            >
                                                {getInitials(client.name)}
                                            </Avatar>
                                        }
                                        title={
                                            <Typography
                                                variant="h3"
                                                className="font-bold text-sm"
                                            >
                                                {client.name}
                                            </Typography>
                                        }
                                        subheader={
                                            <Typography
                                                className="text-xs"
                                            >
                                                {client.email}
                                            </Typography>
                                        }
                                        action={
                                            selectedClient?.id === client.id &&
                                            <CheckCircleOutline color="primary" />
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