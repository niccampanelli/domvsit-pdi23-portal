import { yupResolver } from "@hookform/resolvers/yup";
import { EnhancedEncryptionOutlined, LockOutlined, VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { useAuthContext } from "../../context/Auth";
import { useToastsContext } from "../../context/Toasts";
import authService from "../../services/authService";
import { IChangePasswordModalFormValues, IChangePasswordModalProps } from "../../types/components/ChangePasswordModal";
import { getErrorMessageOrDefault } from "../../util/getErrorMessageOrDefault";

const schema: yup.ObjectSchema<IChangePasswordModalFormValues> = yup.object({
    oldPassword: yup
        .string()
        .required("Informe a sua senha"),
    newPassword: yup
        .string()
        .required("Informe uma senha")
        .min(8, "A senha deve ter no mínimo 8 caracteres")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "A senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial"
        )
        .notOneOf([yup.ref("oldPassword")], "A nova senha não pode ser igual à senha antiga")
        .defined(),
    confirmNewPassword: yup
        .string()
        .required("Confirme a senha")
        .oneOf([yup.ref("newPassword")], "A confirmação deve ser igual à nova senha")
        .defined()
})

export default function ChangePasswordModal({
    open,
    onClose
}: IChangePasswordModalProps) {

    const defaultValues: IChangePasswordModalFormValues = {
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    }

    const {
        control,
        handleSubmit,
        formState: {
            isDirty,
            isValid
        }
    } = useForm<IChangePasswordModalFormValues>({
        mode: "all",
        defaultValues,
        resolver: yupResolver(schema)
    })

    const { addToast } = useToastsContext()
    const { user } = useAuthContext()

    const [oldPasswordVisible, setOldPasswordVisible] = useState(false)
    const [newPasswordVisible, setNewPasswordVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handlePasswordChange(values: IChangePasswordModalFormValues) {
        setLoading(true)

        if (!user) {
            addToast({
                title: "Erro ao alterar senha",
                message: "Usuário não encontrado",
                type: "error"
            })
            setLoading(false)
            onClose()
            return
        }

        try {
            await authService.resetPassword({
                login: user.email,
                oldPassword: values.oldPassword,
                newPassword: values.newPassword
            })

            addToast({
                title: "Senha alterada",
                message: "A sua senha foi alterada com sucesso",
                type: "success"
            })
        }
        catch (error) {
            const message = getErrorMessageOrDefault(error)

            addToast({
                title: "Erro ao alterar senha",
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
        <Dialog
            maxWidth="xs"
            fullWidth
            open={open}
            onClose={onClose}
            PaperProps={{
                component: "form",
                onSubmit: handleSubmit(handlePasswordChange)
            }}
        >
            <DialogTitle>
                Alterar senha
            </DialogTitle>
            <DialogContent className="flex flex-col gap-4">
                <Controller
                    control={control}
                    name="oldPassword"
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            {...field}
                            placeholder="Digite a sua senha atual"
                            type={oldPasswordVisible ? "text" : "password"}
                            autoComplete="current-password"
                            required
                            error={!!error}
                            helperText={error?.message}
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockOutlined />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setOldPasswordVisible(previous => !previous)}
                                        >
                                            {oldPasswordVisible ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="newPassword"
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            {...field}
                            placeholder="Crie uma nova senha"
                            type={newPasswordVisible ? "text" : "password"}
                            autoComplete="new-password"
                            required
                            error={!!error}
                            helperText={error?.message}
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EnhancedEncryptionOutlined />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setNewPasswordVisible(previous => !previous)}
                                        >
                                            {newPasswordVisible ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="confirmNewPassword"
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            {...field}
                            placeholder="Confirme a nova senha"
                            type={newPasswordVisible ? "text" : "password"}
                            autoComplete="off"
                            required
                            error={!!error}
                            helperText={error?.message}
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EnhancedEncryptionOutlined />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setNewPasswordVisible(previous => !previous)}
                                        >
                                            {newPasswordVisible ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    )}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    fullWidth
                    type="submit"
                    disabled={!isDirty || !isValid || loading}
                >
                    {loading ?
                        <CircularProgress size={24} color="inherit" />
                        :
                        "Alterar"
                    }
                </Button>
            </DialogActions>
        </Dialog>
    )
}