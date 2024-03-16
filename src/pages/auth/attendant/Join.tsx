import { yupResolver } from "@hookform/resolvers/yup";
import { BadgeOutlined, CodeOutlined, EmailOutlined, Person2Outlined } from "@mui/icons-material";
import { Button, CircularProgress, InputAdornment, Link, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useToastsContext } from "../../../context/Toasts";
import { IAttendantJoinFormValues } from "../../../types/pages/auth/attendant/Join";
import { getErrorMessageOrDefault } from "../../../util/getErrorMessageOrDefault";
import clientService from "../../../services/clientService";
import { motion, Variants } from "framer-motion";

const schema: yup.ObjectSchema<IAttendantJoinFormValues> = yup.object({
    name: yup
        .string()
        .required("Insira o seu nome"),
    email: yup
        .string()
        .email("Insira um email válido")
        .required("Insira o seu email"),
    role: yup
        .string()
        .required("Informe o seu cargo"),
    attendantToken: yup
        .string()
        .required("Informe o código do participante")
})

const formVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 20
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4
        }
    },
    exit: {
        opacity: 0,
        y: 20,
        transition: {
            duration: 0.1
        }
    }
}

export default function AttendantJoin() {

    const defaultValues: IAttendantJoinFormValues = {
        name: "",
        email: "",
        role: "",
        attendantToken: ""
    }

    const {
        control,
        handleSubmit,
        formState: {
            isDirty,
            isValid
        }
    } = useForm<IAttendantJoinFormValues>({
        mode: "all",
        defaultValues,
        resolver: yupResolver(schema)
    })

    const { addToast } = useToastsContext()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    async function handleJoin(values: IAttendantJoinFormValues) {
        setLoading(true)

        try {
            const data = await clientService.join({
                name: values.name,
                email: values.email,
                role: values.role,
                attendantToken: values.attendantToken
            })

            if (!data.id) {
                throw new Error("Participante não cadastrado")
            }

            addToast({
                title: "Participante cadastrado",
                message: "Você agora faz parte do cliente. Entre como participante para acessar os seus eventos.",
                type: "success",
            })

            if (!data.isEmailInDomain) {
                addToast({
                    title: "Email fora do domínio",
                    message: "O email informado não pertence ao domínio do cliente.",
                    type: "warning",
                })
            }

            navigate("/auth/attendant/login")
        }
        catch (error) {
            const message = getErrorMessageOrDefault(error)

            addToast({
                title: "Erro ao participar do cliente",
                message,
                type: "error",
            })
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <motion.form
            className="flex flex-1 flex-col w-full max-w-96 gap-4"
            onSubmit={handleSubmit(handleJoin)}
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <Typography
                variant="h1"
                className="text-2xl font-semibold"
            >
                Participar de um cliente
            </Typography>
            <Controller
                control={control}
                name="name"
                render={({ field, fieldState: { error } }) => (
                    <TextField
                        {...field}
                        placeholder="Informe o seu nome"
                        autoComplete="name"
                        required
                        error={!!error}
                        helperText={error?.message}
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Person2Outlined />
                                </InputAdornment>
                            )
                        }}
                    />
                )}
            />
            <Controller
                control={control}
                name="email"
                render={({ field, fieldState: { error } }) => (
                    <TextField
                        {...field}
                        placeholder="Digite o seu email"
                        type="email"
                        autoComplete="email"
                        required
                        error={!!error}
                        helperText={error?.message}
                        fullWidth
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
                name="role"
                render={({ field, fieldState: { error } }) => (
                    <TextField
                        {...field}
                        placeholder="Informe o seu cargo"
                        autoComplete="organization-title"
                        required
                        error={!!error}
                        helperText={error?.message}
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <BadgeOutlined />
                                </InputAdornment>
                            )
                        }}
                    />
                )}
            />
            <Controller
                control={control}
                name="attendantToken"
                render={({ field, fieldState: { error } }) => (
                    <TextField
                        {...field}
                        placeholder="Código de participante"
                        autoComplete="on"
                        required
                        error={!!error}
                        helperText={error?.message}
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CodeOutlined />
                                </InputAdornment>
                            )
                        }}
                    />
                )}
            />
            <Button
                type="submit"
                disabled={!isDirty || !isValid || loading}
            >
                {loading ?
                    <CircularProgress size={26} color="inherit" />
                    :
                    "Participar"
                }
            </Button>
            <Typography>
                Já faz parte de um cliente?
            </Typography>
            <Button
                component={RouterLink}
                variant="outlined"
                to="/auth/attendant/login"
            >
                Entre como participante
            </Button>
            <Typography>
                Ou <Link component={RouterLink} to="/auth/signup">cadastre-se como consultor</Link>
            </Typography>
        </motion.form>
    )
}