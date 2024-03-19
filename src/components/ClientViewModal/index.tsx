import { Avatar, Button, Card, CardContent, CircularProgress, Dialog, DialogContent, DialogTitle, IconButton, Tooltip, Typography } from "@mui/material";
import moment from "moment";
import { IClientViewModalProps } from "../../types/components/ClientViewModal";
import getColorFromString from "../../util/getColorFromString";
import getInitials from "../../util/getInitials";
import { IGetAttendantTokenResponse } from "../../types/services/clientService";
import { useToastsContext } from "../../context/Toasts";
import { getErrorMessageOrDefault } from "../../util/getErrorMessageOrDefault";
import clientService from "../../services/clientService";
import { useEffect, useState } from "react";
import { ContentCopyOutlined } from "@mui/icons-material";

export default function ClientViewModal({
    open,
    onClose,
    client,
    actionButton
}: IClientViewModalProps) {

    const { addToast } = useToastsContext()

    const [attendantToken, setAttendantToken] = useState<IGetAttendantTokenResponse | undefined>()
    const [attendantTokenLoading, setAttendantTokenLoading] = useState(false)
    const [tokenCopied, setTokenCopied] = useState(false)

    async function handleGetAttendantToken() {
        setAttendantTokenLoading(true)

        try {
            const data = await clientService.getAttendantToken(client!.id)

            setAttendantToken(data)
        }
        catch (error) {
            const message = getErrorMessageOrDefault(error)
            addToast({
                title: "Erro ao obter código de participante",
                message,
                type: "error",
            })
        }
        finally {
            setAttendantTokenLoading(false)
        }
    }

    useEffect(() => {
        setAttendantToken(undefined)
    }, [open])

    function handleTokenCopy() {
        navigator.clipboard.writeText(attendantToken?.value || "")
        setTokenCopied(true)
        setTimeout(() => setTokenCopied(false), 3000)
    }

    return (
        <Dialog maxWidth="xs" fullWidth open={open} onClose={onClose}>
            <DialogTitle
                className="flex items-center gap-4"
            >
                <Avatar
                    alt={client?.name}
                    sx={{
                        bgcolor: getColorFromString(client?.name || ""),
                        fontWeight: 400
                    }}
                >
                    {getInitials(client?.name || "")}
                </Avatar>
                {client?.name}
            </DialogTitle>
            <DialogContent className="flex flex-col items-start gap-4">
                <div className="flex flex-col gap-2">
                    <Typography className="font-bold">
                        Email
                    </Typography>
                    <Typography>
                        {client?.email}
                    </Typography>
                </div>
                <div className="flex flex-col gap-2">
                    <Typography className="font-bold">
                        Telefone
                    </Typography>
                    <Typography>
                        {client?.phone}
                    </Typography>
                </div>
                {(client?.id && !attendantToken) ?
                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={handleGetAttendantToken}
                        disabled={attendantTokenLoading}
                    >
                        {attendantTokenLoading ?
                            <CircularProgress size={24} />
                            :
                            "Obter código de participante"
                        }
                    </Button>
                    :
                    <Card
                        variant="outlined"
                        sx={{
                            width: "100%"
                        }}
                    >
                        <CardContent>
                            <Typography>
                                Utilize o código abaixo para que os participantes possam se juntar ao cliente:
                            </Typography>
                            <Typography
                                className="font-bold text-xl my-4"
                            >
                                {attendantToken?.value}
                                <Tooltip
                                    title={tokenCopied ? "Copiado!" : "Copiar código"}
                                    arrow
                                >
                                    <IconButton
                                        className="ml-2"
                                        size="small"
                                        onClick={handleTokenCopy}
                                    >
                                        <ContentCopyOutlined fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            </Typography>
                            {attendantToken?.expiredAt &&
                                <Card
                                    variant="outlined"
                                    sx={theme => ({
                                        width: "100%",
                                        borderColor: theme.palette.warning.main,
                                        marginBottom: theme.spacing(1)
                                    })}
                                >
                                    <CardContent
                                        sx={theme => ({
                                            padding: theme.spacing(1) + "!important",
                                        })}
                                    >
                                        <Typography
                                            variant="body2"
                                            color="warning.main"
                                        >
                                            O código de participante anterior expirou em {moment(attendantToken?.expiredAt).format("DD/MM/YYYY")} e um novo código foi gerado.
                                        </Typography>
                                    </CardContent>
                                </Card>
                            }
                            <Typography
                                variant="caption"
                            >
                                Esse código irá expirar em {moment(attendantToken?.expiresAt).format("DD/MM/YYYY [às] HH:mm")}
                            </Typography>
                        </CardContent>
                    </Card>
                }
                <Typography
                    variant="caption"
                >
                    {moment(client?.createdAt).format("[Criado em] DD/MM/YYYY [às] HH:mm")}
                </Typography>
            </DialogContent>
            <div className="flex flex-col gap-4 fixed bottom-8 right-8">
                {actionButton}
            </div>
        </Dialog>
    )
}