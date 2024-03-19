import { yupResolver } from "@hookform/resolvers/yup";
import { Button, CircularProgress, IconButton, InputAdornment, Link, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { IAdminSignUpFormValues } from "../../../types/pages/auth/admin/SignUp";
import { useToastsContext } from "../../../context/Toasts";
import { useState } from "react";
import { getErrorMessageOrDefault } from "../../../util/getErrorMessageOrDefault";
import authService from "../../../services/authService";
import { EmailOutlined, LockOutlined, Person2Outlined, VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { motion, Variants } from "framer-motion";

const schema: yup.ObjectSchema<IAdminSignUpFormValues> = yup.object({
    name: yup
        .string()
        .required("Insira o seu nome"),
    email: yup
        .string()
        .email("Insira um email válido")
        .required("Insira o seu email"),
    password: yup
        .string()
        .required("Informe uma senha")
        .min(8, "A senha deve ter no mínimo 8 caracteres")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "A senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial"
        )
        .defined(),
    confirmPassword: yup
        .string()
        .required("Confirme a senha")
        .oneOf([yup.ref("password")], "A confirmação deve ser igual à senha")
        .defined(),
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

export default function AdminSignUp() {

    const defaultValues: IAdminSignUpFormValues = {
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    }

    const {
        control,
        handleSubmit,
        formState: {
            isDirty,
            isValid
        }
    } = useForm<IAdminSignUpFormValues>({
        mode: "all",
        defaultValues,
        resolver: yupResolver(schema)
    })

    const { addToast } = useToastsContext()
    const navigate = useNavigate()

    const [passwordVisible, setPasswordVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleSignUp(values: IAdminSignUpFormValues) {
        setLoading(true)

        try {
            const data = await authService.signUp({
                name: values.name,
                email: values.email,
                password: values.password
            })

            if (!data.id) {
                throw new Error("Usuário não cadastrado")
            }

            addToast({
                title: "Cadastro realizado com sucesso",
                message: "Seja bem-vindo! Faça login para continuar",
                type: "success"
            })

            navigate("/auth/login")
        }
        catch (error) {
            const message = getErrorMessageOrDefault(error)

            addToast({
                title: "Erro ao realizar o cadastro",
                message,
                type: "error"
            })
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <motion.form
            className="flex flex-1 flex-col w-full max-w-96 gap-4"
            onSubmit={handleSubmit(handleSignUp)}
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <Typography
                variant="h1"
                className="text-2xl font-semibold"
            >
                Cadastre-se
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
                name="password"
                render={({ field, fieldState: { error } }) => (
                    <TextField
                        {...field}
                        placeholder="Crie uma senha"
                        type={passwordVisible ? "text" : "password"}
                        autoComplete="new-password"
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
                                        onClick={() => setPasswordVisible(previous => !previous)}
                                    >
                                        {passwordVisible ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                )}
            />
            <Controller
                control={control}
                name="confirmPassword"
                render={({ field, fieldState: { error } }) => (
                    <TextField
                        {...field}
                        placeholder="Confirme a senha"
                        type={passwordVisible ? "text" : "password"}
                        autoComplete="off"
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
                                        onClick={() => setPasswordVisible(previous => !previous)}
                                    >
                                        {passwordVisible ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
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
                    "Cadastrar"
                }
            </Button>
            <Typography>
                Já tem uma conta?
            </Typography>
            <Button
                component={RouterLink}
                variant="outlined"
                to="/auth/login"
            >
                Faça login
            </Button>
            <Typography>
                Ou <Link component={RouterLink} to="/auth/attendant/join">faça parte de um cliente</Link>
            </Typography>
        </motion.form>
    )
}