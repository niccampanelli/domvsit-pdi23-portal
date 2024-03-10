import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import * as yup from 'yup'
import Button from "../../../../components/Button"
import Input from "../../../../components/Input"
import Spinner from "../../../../components/Spinner"
import { useAuthContext } from "../../../../context/Auth"
import styles from "../../auth.module.css"
import Link from "../../../../components/Link"

const defaultValues = {
    email: '',
    attendantToken: ''
}

const schema = yup.object().shape({
    email: yup
        .string()
        .email("Insira um email válido")
        .required("Insira o seu email"),
    attendantToken: yup
        .string()
        .required("Insira o seu código de participante")
})

export default function AttendantLogin() {

    const [loading, setLoading] = useState(false)

    const {
        control,
        handleSubmit
    } = useForm({
        mode: 'all',
        defaultValues: defaultValues,
        resolver: yupResolver(schema)
    })

    const { loginAttendant } = useAuthContext()

    async function handleLogin(model: typeof defaultValues) {
        setLoading(true)
        await loginAttendant({
            email: model.email,
            attendantToken: model.attendantToken
        })
        setLoading(false)
    }

    return (
        <form
            className={styles.form}
            onSubmit={event => handleSubmit(handleLogin)(event)}
        >
            <h1>Entrar como participante</h1>
            <Controller
                name="email"
                control={control}
                render={({ field, fieldState: { error } }) =>
                    <Input
                        {...field}
                        placeholder="Email corporativo"
                        type="email"
                        error={error?.message}
                        autoFocus
                    />
                }
            />
            <Controller
                name="attendantToken"
                control={control}
                render={({ field, fieldState: { error } }) =>
                    <Input
                        {...field}
                        placeholder="Código de participante"
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
                to="/attendant/join"
                type="button"
            >
                Participe de um cliente
            </Button>
            <span>
                Ou faça login como <Link to="/login">usuário</Link>.
            </span>
        </form>
    )
}