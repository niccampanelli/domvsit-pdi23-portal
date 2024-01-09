import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"
import * as yup from 'yup'
import Button from "../../../components/Button"
import Input from "../../../components/Input"
import { useAuthContext } from "../../../context/Auth"
import styles from "../auth.module.css"

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

export default function Login() {

    const {
        control,
        handleSubmit
    } = useForm({
        mode: 'all',
        defaultValues: defaultValues,
        resolver: yupResolver(schema)
    })

    const { login } = useAuthContext()

    function handleLogin(model: any) {
        login({ login: model.email, password: model.password })
    }

    return (
        <div className={styles.form}>
            <Controller
                name="email"
                control={control}
                render={({ field, fieldState: { error } }) =>
                    <Input
                        {...field}
                        placeholder="Email"
                        error={error?.message}
                    />
                } />
            <Controller
                name="password"
                control={control}
                render={({ field, fieldState: { error } }) =>
                    <Input
                        {...field}
                        placeholder="Password"
                        type="password"
                        error={error?.message}
                    />
                } />
            <Button
                onClick={handleSubmit(handleLogin)}
            >
                Login
            </Button>
            <Button
                link
                to="/signup"
            >
                Cadastre-se
            </Button>
        </div>
    )
}