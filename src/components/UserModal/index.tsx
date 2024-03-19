import { Button, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { IUserModalProps } from "../../types/components/UserModal";
import { isUser } from "../../types/context/User";

export default function UserModal({
    open,
    onClose,
    user,
    openChangePasswordModal
}: IUserModalProps) {

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