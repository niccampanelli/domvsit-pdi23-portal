import { yupResolver } from "@hookform/resolvers/yup";
import { EmailOutlined, NotesOutlined, PhoneOutlined } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { useToastsContext } from "../../context/Toasts";
import { IClientEditModalFormValues, IClientEditModalProps } from "../../types/components/ClientEditModal";
import { getErrorMessageOrDefault } from "../../util/getErrorMessageOrDefault";

const schema: yup.ObjectSchema<IClientEditModalFormValues> = yup.object().shape({
    name: yup
        .string()
        .required("Insira um nome para o cliente"),
    email: yup
        .string()
        .email("Email inválido")
        .required("Insia um email para o cliente"),
    phone: yup
        .string()
        .required("Insira um telefone para o cliente")
})

export default function ClientEditModal({
    open,
    onClose,
    client,
    actionButton
}: IClientEditModalProps) {

    const { addToast } = useToastsContext()

    const defaultValues: IClientEditModalFormValues = {
        name: "",
        email: "",
        phone: ""
    }

    const {
        control,
        handleSubmit,
        formState: {
            isDirty,
            isValid
        },
        reset
    } = useForm({
        mode: "all",
        defaultValues,
        resolver: yupResolver(schema)
    })

    const [loading, setLoading] = useState(false)

    async function handleEdit(values: IClientEditModalFormValues) {
        setLoading(true)

        try {
            // const data 
        }
        catch (error) {
            const message = getErrorMessageOrDefault(error)

            addToast({
                title: "Erro ao editar o cliente",
                message,
                type: "error"
            })
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (client) {
            reset({
                name: client.name,
                email: client.email,
                phone: client.phone
            })
        }
        else {
            reset(defaultValues)
        }
    }, [client, open])

    return (
        <Dialog
            maxWidth="xs"
            fullWidth
            open={open}
            onClose={onClose}
            PaperProps={{
                component: "form",
                onSubmit: handleSubmit(handleEdit)
            }}
        >
            <DialogTitle>
                Editar cliente
            </DialogTitle>
            <DialogContent className="flex flex-col gap-4">
                <Controller
                    control={control}
                    name="name"
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            placeholder="Nome do cliente"
                            autoComplete="organization-title"
                            fullWidth
                            required
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <NotesOutlined />
                                    </InputAdornment>
                                )
                            }}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="email"
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            placeholder="Email do cliente"
                            autoComplete="email"
                            type="email"
                            fullWidth
                            required
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailOutlined />
                                    </InputAdornment>
                                )
                            }}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="phone"
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            placeholder="Telefone do cliente"
                            autoComplete="tel"
                            type="tel"
                            fullWidth
                            required
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PhoneOutlined />
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
                    Salvar
                </Button>
            </DialogActions>
            <div className="fixed bottom-8 right-8">
                {actionButton}
            </div>
        </Dialog>
    )
}