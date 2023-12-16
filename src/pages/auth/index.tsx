import { useState } from "react"
import { useAuthContext } from "../../context/Auth"
import Button from "../../components/Button"
import Input from "../../components/Input"

export default function Auth() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { login } = useAuthContext()

    return (
        <div>
            <h1>Auth</h1>
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
        </div>
    )
}