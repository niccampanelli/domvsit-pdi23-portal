import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import Button from '../../../../components/Button'
import Input from '../../../../components/Input'
import Link from '../../../../components/Link'
import Spinner from '../../../../components/Spinner'
import clientService from '../../../../services/clientService'
import styles from "../../auth.module.css"

const defaultValues = {
    name: '',
    email: '',
    role: '',
    attendantToken: ''
}

const schema = yup.object().shape({
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
        .required("Informe o código de participante")
})

export default function AttendantJoin() {

    const [loading, setLoading] = useState(false)

    const {
        control,
        handleSubmit
    } = useForm({
        mode: 'all',
        defaultValues: defaultValues,
        resolver: yupResolver(schema)
    })

    async function handleJoin(model: typeof defaultValues) {
        setLoading(true)
        await clientService.join({
            name: model.name,
            email: model.email,
            role: model.role,
            attendantToken: model.attendantToken
        })
        setLoading(false)
    }

    return (
        <form
            className={styles.form}
            onSubmit={event => handleSubmit(handleJoin)(event)}
        >
            <h1>Participar de um cliente</h1>
            <Controller
                name="name"
                control={control}
                render={({ field, fieldState: { error } }) =>
                    <Input
                        {...field}
                        placeholder="Nome"
                        error={error?.message}
                        autoFocus
                    />
                }
            />
            <Controller
                name="email"
                control={control}
                render={({ field, fieldState: { error } }) =>
                    <Input
                        {...field}
                        placeholder="Email"
                        type="email"
                        error={error?.message}
                    />
                }
            />
            <Controller
                name="role"
                control={control}
                render={({ field, fieldState: { error } }) =>
                    <Input
                        {...field}
                        placeholder="Cargo"
                        error={error?.message}
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
                    "Participar"
                }
            </Button>
            <span
                className={styles.tip}
            >
                Já está cadastrado?
            </span>
            <Button
                link
                to="/attendant/login"
                type="button"
            >
                Entrar como participante
            </Button>
            <span>
                Ou cadastre-se como <Link to="/signup">usuário</Link>.
            </span>
        </form>
    )
}