import { useState } from "react"
import { useAuthContext } from "../../context/Auth"
import banner from "../../assets/images/office.jpg"
import Button from "../../components/Button"
import Input from "../../components/Input"
import styles from "./auth.module.css"
import { Link } from "react-router-dom"

export default function Auth() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { login } = useAuthContext()

    return (
        <div className={styles.root}>
            <section className={styles.card}>
                <h1
                    className={styles.logo}
                >
                    Planify
                </h1>
                <div className={styles.form}>
                    <Input
                        placeholder="Email"
                        onChange={event => setEmail(event.target.value)}
                        value={email}
                    />
                    <Input
                        placeholder="Password"
                        onChange={event => setPassword(event.target.value)}
                        value={password}
                    />
                    <Button
                        onClick={() => login({ login: email, password })}
                    >
                        Login
                    </Button>
                    <Button>
                        Cadastre-se
                    </Button>
                </div>
            </section>
            <img
                src={banner}
                alt="Ilustração"
                width={300}
                className={styles.banner}
            />
        </div>
    )
}