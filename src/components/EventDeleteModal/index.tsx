import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useState } from "react";
import { useToastsContext } from "../../context/Toasts";
import eventService from "../../services/eventService";
import { IEventDeleteModalProps } from "../../types/components/EventDeleteModal";
import { getErrorMessageOrDefault } from "../../util/getErrorMessageOrDefault";

export default function EventDeleteModal({
    open,
    onClose,
    event,
    refreshData
}: IEventDeleteModalProps) {

    const { addToast } = useToastsContext()

    const [loading, setLoading] = useState(false)

    async function handleDelete() {
        setLoading(true)

        try {
            await eventService.deleteEvent(event!.id)

            addToast({
                title: "Evento excluído",
                message: "O evento foi excluído com sucesso",
                type: "success"
            })

            refreshData()
        }
        catch (error) {
            const message = getErrorMessageOrDefault(error)

            addToast({
                title: "Erro ao excluir o evento",
                message: message,
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
                Excluir o evento
            </DialogTitle>
            <DialogContent>
                <Typography>
                    Tem certeza que deseja excluir permanentemente o evento <strong>"{event?.title}"</strong>? Esta ação não poderá ser desfeita.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    fullWidth
                    disabled={loading}
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