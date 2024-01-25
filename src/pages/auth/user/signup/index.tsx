import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import Button from '../../../../components/Button'
import Input from '../../../../components/Input'
import Link from '../../../../components/Link'
import Spinner from '../../../../components/Spinner'
import authService from '../../../../services/authService'
import styles from "../../auth.module.css"

const defaultValues = {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''
}

const schema = yup.object().shape({
    name: yup
        .string()
        .required("Insira o seu nome"),
    email: yup
        .string()
        .email("Insira um email válido")
        .required("Insira o seu email"),
    password: yup
        .string()
        .required("Informe umaa senha")
        .min(8, "A senha deve ter no mínimo 8 caracteres")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "A senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial"
        )
        .defined(),
    passwordConfirmation: yup
        .string()
        .required("Confirme a senha")
        .oneOf([yup.ref("password")], "A confirmação deve ser igual à senha")
        .defined(),
})

export default function UserSignUp() {

    const [loading, setLoading] = useState(false)

    const {
        control,
        handleSubmit
    } = useForm({
        mode: 'all',
        defaultValues: defaultValues,
        resolver: yupResolver(schema)
    })

    async function handleSignUp(model: typeof defaultValues) {
        setLoading(true)
        await authService.signUp({
            name: model.name,
            email: model.email,
            password: model.password
        })
        setLoading(false)
    }

    return (
        <form
            className={styles.form}
            onSubmit={event => handleSubmit(handleSignUp)(event)}
        >
            <h1>Cadastre-se</h1>
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
                        error={error?.message}
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
            <Controller
                name="passwordConfirmation"
                control={control}
                render={({ field, fieldState: { error } }) =>
                    <Input
                        {...field}
                        placeholder="Confirme a senha"
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
                    "Cadastrar"
                }
            </Button>
            <span
                className={styles.tip}
            >
                Já está cadastrado?
            </span>
            <Button
                link
                to="/login"
                type="button"
            >
                Faça login
            </Button>
            <span>
                Ou <Link to="/attendant/join">participe de um cliente</Link>.
            </span>
        </form>
    )
}