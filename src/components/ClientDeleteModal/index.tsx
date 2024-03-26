import { FaceOutlined } from "@mui/icons-material";
import { Button, Card, CardContent, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useToastsContext } from "../../context/Toasts";
import clientService from "../../services/clientService";
import { IClientDeleteModalProps } from "../../types/components/ClientDeleteModal";
import { getErrorMessageOrDefault } from "../../util/getErrorMessageOrDefault";

export default function ClientDeleteModal({
    open,
    onClose,
    client,
    refreshData
}: IClientDeleteModalProps) {

    const { addToast } = useToastsContext()

    const [nameConfirmation, setNameConfirmation] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleDelete() {
        setLoading(true)

        try {
            await clientService.deleteClient(client!.id)

            addToast({
                title: "Cliente excluído",
                message: "O cliente foi excluído com sucesso",
                type: "success"
            })

            refreshData()
        }
        catch (error) {
            const message = getErrorMessageOrDefault(error)

            addToast({
                title: "Erro ao excluir o cliente",
                message,
                type: "error"
            })
        }
        finally {
            setLoading(false)
            onClose()
        }
    }

    return (
        <Dialog maxWidth="xs" fullWidth open={open} onClose={onClose}>
            <DialogTitle>
                Excluir o cliente
            </DialogTitle>
            <DialogContent>
                <Typography>
                    Tem certeza que deseja excluir permanentemente o cliente <strong>{client?.name}</strong>? Esta ação não poderá ser desfeita.
                </Typography>
                <Card
                    variant="outlined"
                    sx={theme => ({
                        width: "100%",
                        borderColor: theme.palette.warning.main,
                        marginBottom: theme.spacing(1),
                        marginY: theme.spacing(2)
                    })}
                >
                    <CardContent>
                        <Typography
                            variant="body2"
                            color="warning.main"
                        >
                            Todos os participantes e todos os eventos associados a este cliente também serão excluídos permanentemente.
                        </Typography>
                    </CardContent>
                </Card>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    className="mb-2"
                >
                    Para confirmar, digite o nome do cliente.
                </Typography>
                <TextField
                    placeholder="Confirme o nome do cliente"
                    autoComplete="off"
                    fullWidth
                    required
                    error={nameConfirmation !== "" && nameConfirmation !== client?.name}
                    helperText={(nameConfirmation !== "" && nameConfirmation !== client?.name) ? "Digite o nome do cliente" : ""}
                    value={nameConfirmation}
                    onChange={(e) => setNameConfirmation(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <FaceOutlined />
                            </InputAdornment>
                        )
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    fullWidth
                    disabled={nameConfirmation !== client?.name || loading}
                    onClick={handleDelete}
                >
                    {loading ?
                        <CircularProgress size={24} />
                        :
                        "Excluir"
                    }
                </Button>
            </DialogActions>
        </Dialog>
    )
}