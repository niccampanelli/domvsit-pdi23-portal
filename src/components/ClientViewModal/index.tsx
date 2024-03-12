import { Avatar, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import moment from "moment";
import { IClientViewModalProps } from "../../types/components/ClientViewModal";
import getColorFromString from "../../util/getColorFromString";
import getInitials from "../../util/getInitials";

export default function ClientViewModal({
    open,
    onClose,
    client
}: IClientViewModalProps) {

    return (
        <Dialog maxWidth="xs" fullWidth open={open} onClose={onClose}>
            <DialogTitle
                className="flex items-center gap-4"
            >
                <Avatar
                    alt={client?.name}
                    sx={{
                        bgcolor: getColorFromString(client?.name || "")
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
                <Typography
                    variant="caption"
                >
                    {moment(client?.createdAt).format("[Criado em] DD/MM/YYYY [às] HH:mm")}
                </Typography>
            </DialogContent>
        </Dialog>
    )
}