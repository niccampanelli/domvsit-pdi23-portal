import { ContentCopyOutlined } from "@mui/icons-material";
import { Avatar, Dialog, DialogContent, DialogTitle, IconButton, Tooltip, Typography } from "@mui/material";
import moment from "moment";
import { IClientCreateModalCreatedProps } from "../../types/components/ClientCreateModal";
import { useState } from "react";
import getInitials from "../../util/getInitials";
import getColorFromString from "../../util/getColorFromString";

export default function ClientCreateModalCreated({
    open,
    onClose,
    name,
    attendantToken
}: IClientCreateModalCreatedProps) {

    const [tokenCopied, setTokenCopied] = useState(false)

    function handleTokenCopy() {
        navigator.clipboard.writeText(attendantToken?.value || "")
        setTokenCopied(true)
        setTimeout(() => setTokenCopied(false), 3000)
    }

    return (
        <Dialog maxWidth="sm" fullWidth open={open} onClose={onClose}>
            <DialogTitle
                className="flex items-center gap-4"
            >
                <Avatar
                    alt={name}
                    sx={{
                        bgcolor: getColorFromString(name || ""),
                        fontWeight: 400
                    }}
                >
                    {getInitials(name || "")}
                </Avatar>
                {name} foi criado com sucesso!
            </DialogTitle>
            <DialogContent>
                <Typography>
                    Compartilhe o código abaixo para que os participantes possam se juntar ao cliente:
                </Typography>
                <Typography
                    className="font-bold text-2xl my-4"
                >
                    {attendantToken?.value}
                    <Tooltip
                        title={tokenCopied ? "Copiado!" : "Copiar código"}
                        arrow
                    >
                        <IconButton
                            className="ml-2"
                            onClick={handleTokenCopy}
                        >
                            <ContentCopyOutlined />
                        </IconButton>
                    </Tooltip>
                </Typography>
                <Typography
                    variant="caption"
                >
                    Esse código irá expirar em {moment(attendantToken?.expiresAt).format("DD/MM/YYYY [às] HH:mm")}
                </Typography>
            </DialogContent>
        </Dialog>
    )
}