import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import * as yup from 'yup'
import Button from "../../../../components/Button"
import Input from "../../../../components/Input"
import Link from "../../../../components/Link"
import Spinner from "../../../../components/Spinner"
import { useAuthContext } from "../../../../context/Auth"
import styles from "../../auth.module.css"

const defaultValues = {
    email: '',
    password: ''
}

const schema = yup.object().shape({
    email: yup
        .string()
        .email("Insira um email válido")
        .required("Insira o seu email"),
    password: yup
        .string()
        .required("Insira a sua senha")
})

export default function UserLogin() {

    const [loading, setLoading] = useState(false)

    const {
        control,
        handleSubmit
    } = useForm({
        mode: 'all',
        defaultValues: defaultValues,
        resolver: yupResolver(schema)
    })

    const { login } = useAuthContext()

    async function handleLogin(model: typeof defaultValues) {
        setLoading(true)
        await login({
            login: model.email,
            password: model.password
        })
        setLoading(false)
    }

    return (
        <form
            className={styles.form}
            onSubmit={event => handleSubmit(handleLogin)(event)}
        >
            <h1>Fazer login</h1>
            <Controller
                name="email"
                control={control}
                render={({ field, fieldState: { error } }) =>
                    <Input
                        {...field}
                        placeholder="Email"
                        error={error?.message}
                        autoFocus
                    />
                }
            />
            <Controller
                name="password"
                control={control}
                render={({ field, fieldState: { error } }) =>
                    <Input
                        {...field}
                        placeholder="Senha"
                        type="password"
                        error={error?.message}
                    />
                }
            />
            <Button
                disabled={loading}
                type="submit"
            >
                {loading ?
                    <Spinner
                        size={1}
                        color="white"
                    />
                    :
                    "Entrar"
                }
            </Button>
            <span
                className={styles.tip}
            >
                Ainda não possui uma conta?
            </span>
            <Button
                link
                to="/signup"
                type="button"
            >
                Cadastre-se
            </Button>
            <span>
                Ou entre como <Link to="/attendant/login">participante</Link>.
            </span>
        </form>
    )
}