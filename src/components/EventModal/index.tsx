import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { IEventModalProps } from "../../types/components/EventModal";

export default function EventModal({
    open,
    onClose
}: IEventModalProps) {

    return (
        <Dialog maxWidth="xs" fullWidth open={open} onClose={onClose}>
            <DialogTitle>
                Levantamento de requisitos Crefisa
            </DialogTitle>
            <DialogContent>
                Reunião para levantar os requisitos e regras de negócio para o novo sistema de gerenciamento de usuários da Crefisa.
            </DialogContent>
        </Dialog>
    )
}