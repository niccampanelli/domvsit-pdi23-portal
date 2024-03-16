import { yupResolver } from "@hookform/resolvers/yup"
import { EmailOutlined, LockOutlined, VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material"
import { Button, CircularProgress, IconButton, InputAdornment, Link, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import * as yup from "yup"
import { IAdminLoginFormValues } from "../../../types/pages/auth/admin/Login"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import { useAuthContext } from "../../../context/Auth"
import { motion, Variants } from "framer-motion"

const schema: yup.ObjectSchema<IAdminLoginFormValues> = yup.object({
    email: yup
        .string()
        .email("Informe um email válido")
        .required("Informe o seu email"),
    password: yup
        .string()
        .required("Informe a sua senha")
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

export default function AdminLogin() {

    const defaultValues: IAdminLoginFormValues = {
        email: "",
        password: ""
    }

    const {
        control,
        handleSubmit,
        formState: {
            isDirty,
            isValid
        }
    } = useForm<IAdminLoginFormValues>({
        mode: "all",
        defaultValues,
        resolver: yupResolver(schema)
    })

    const { login } = useAuthContext()
    const navigate = useNavigate()

    const [passwordVisible, setPasswordVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleLogin(values: IAdminLoginFormValues) {
        setLoading(true)
        await login({
            login: values.email,
            password: values.password
        })
        setLoading(false)
        navigate("/admin")
    }

    return (
        <motion.form
            className="flex flex-1 flex-col w-full max-w-96 gap-4"
            onSubmit={event => handleSubmit(handleLogin)(event)}
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <Typography
                variant="h1"
                className="text-2xl font-semibold"
            >
                Fazer login
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
                name="password"
                render={({ field, fieldState: { error } }) => (
                    <TextField
                        {...field}
                        placeholder="Digite a sua senha"
                        type={passwordVisible ? "text" : "password"}
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
                                        onClick={() => setPasswordVisible(!passwordVisible)}
                                    >
                                        {passwordVisible ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                                    </IconButton>
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
                    "Entrar"
                }
            </Button>
            <Typography>
                Ainda não possui uma conta?
            </Typography>
            <Button
                component={RouterLink}
                variant="outlined"
                to="/auth/signup"
            >
                Cadastre-se
            </Button>
            <Typography>
                Ou <Link component={RouterLink} to="/auth/attendant/login">entre como um participante</Link>
            </Typography>
        </motion.form>
    )
}