import Button from "../../components/Button";

export default function Home() {

    return (
        <div>
            <h1>Home</h1>
            <p>Login as</p>
            <div>
                <Button
                    link
                    to="/admin"
                >
                    Admin
                </Button>
                <Button
                    link
                    to="/clients"
                >
                    Client
                </Button>
            </div>
        </div>
    )
}