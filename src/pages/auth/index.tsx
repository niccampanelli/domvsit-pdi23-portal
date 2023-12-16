import { useState } from "react"
import { useAuthContext } from "../../context/Auth"

export default function Auth() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { login } = useAuthContext()

    return (
        <div>
            <h1>Auth</h1>
            <input type="text" placeholder="Email" onChange={e => setEmail(e.target.value)} value={email} />
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} value={password} />
            <button onClick={() => login({ login: email, password })}>Login</button>
        </div>
    )
}