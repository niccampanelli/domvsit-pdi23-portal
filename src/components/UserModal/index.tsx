import { Avatar, Button, Card, CardHeader, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useToastsContext } from "../../context/Toasts";
import clientService from "../../services/clientService";
import { IUserModalProps } from "../../types/components/UserModal";
import { isAttendant, isUser } from "../../types/context/User";
import { IGetClientByIdResponse } from "../../types/services/clientService";
import getColorFromString from "../../util/getColorFromString";
import { getErrorMessageOrDefault } from "../../util/getErrorMessageOrDefault";
import getInitials from "../../util/getInitials";

export default function UserModal({
    open,
    onClose,
    user,
    openChangePasswordModal
}: IUserModalProps) {

    const { addToast } = useToastsContext()

    const [client, setClient] = useState<IGetClientByIdResponse | undefined>(undefined)
    const [clientLoading, setClientLoading] = useState(false)

    async function fetchClient() {
        setClientLoading(true)

        if (!user)
            return

        if (!isAttendant(user))
            return

        if (!user.clientId)
            return

        try {
            const data = await clientService.getClientById(user.clientId)

            setClient(data)
        }
        catch (error) {
            const message = getErrorMessageOrDefault(error)

            addToast({
                title: "Erro ao buscar cliente relacionado ao participante",
                message,
                type: "error"
            })
        }
        finally {
            setClientLoading(false)
        }
    }

    useEffect(() => {
        if (user && isAttendant(user)) {
            fetchClient()
        }
    }, [user])

    return (
        <Dialog maxWidth="xs" fullWidth open={open} onClose={onClose}>
            <DialogTitle>
                Suas informações
            </DialogTitle>
            <DialogContent className="flex flex-col items-start gap-4">
                <div className="flex flex-col gap-2">
                    <Typography className="font-bold">
                        Nome
                    </Typography>
                    <Typography>
                        {user?.name}
                    </Typography>
                </div>
                <div className="flex flex-col gap-2">
                    <Typography className="font-bold">
                        Email
                    </Typography>
                    <Typography>
                        {user?.email}
                    </Typography>
                </div>
                {isAttendant(user) &&
                    <>
                        <div className="flex flex-col gap-2">
                            <Typography className="font-bold">
                                Cargo
                            </Typography>
                            <Typography>
                                {user?.role}
                            </Typography>
                        </div>
                        {(!clientLoading && client) &&
                            <div className="flex flex-col gap-2 w-full">
                                <Typography className="font-bold">
                                    Cliente
                                </Typography>
                                <Card
                                    variant="outlined"
                                    className="w-full"
                                >
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
                                                className="font-bold text-base"
                                            >
                                                {client.name}
                                            </Typography>
                                        }
                                    />
                                </Card>
                            </div>
                        }
                    </>
                }
                {isUser(user) &&
                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={openChangePasswordModal}
                    >
                        Alterar senha
                    </Button>
                }
            </DialogContent>
        </Dialog>
    )
}