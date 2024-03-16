import { yupResolver } from "@hookform/resolvers/yup";
import { CodeOutlined, EmailOutlined } from "@mui/icons-material";
import { Button, CircularProgress, InputAdornment, Link, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import * as yup from "yup";
import { useAuthContext } from "../../../context/Auth";
import { useToastsContext } from "../../../context/Toasts";
import { IAttendantLoginFormValues } from "../../../types/pages/auth/attendant/Login";
import { motion, Variants } from "framer-motion";

const schema: yup.ObjectSchema<IAttendantLoginFormValues> = yup.object({
    email: yup
        .string()
        .email("Informe um email válido")
        .required("Informe o seu email"),
    attendantToken: yup
        .string()
        .required("Informe o código de participante")
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

export default function AttendantLogin() {

    const defaultValues: IAttendantLoginFormValues = {
        email: "",
        attendantToken: ""
    }

    const {
        control,
        handleSubmit,
        formState: {
            isDirty,
            isValid
        }
    } = useForm<IAttendantLoginFormValues>({
        mode: "all",
        defaultValues,
        resolver: yupResolver(schema)
    })

    const { addToast } = useToastsContext()
    const { attendantLogin } = useAuthContext()

    const [loading, setLoading] = useState(false)

    async function handleLogin(values: IAttendantLoginFormValues) {
        setLoading(true)
        await attendantLogin({
            email: values.email,
            attendantToken: values.attendantToken
        })
        setLoading(false)
    }

    return (
        <motion.form
            className="flex flex-1 flex-col w-full max-w-96 gap-4"
            onSubmit={handleSubmit(handleLogin)}
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <Typography
                variant="h1"
                className="text-2xl font-semibold"
            >
                Entrar como participante
            </Typography>
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
                Ainda não faz parte de um cliente?
            </Typography>
            <Button
                component={RouterLink}
                variant="outlined"
                to="/auth/attendant/join"
            >
                Participe de um cliente
            </Button>
            <Typography>
                Ou <Link component={RouterLink} to="/auth/login">faça login como um consultor</Link>
            </Typography>
        </motion.form>
    )
}