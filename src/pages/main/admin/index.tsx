import Card from "../../../components/Card";
import styles from "./admin.module.css";

export default function Admin() {

    const clients = [
        {
            name: "Client 1",
            email: "client1@email.com"
        },
        {
            name: "Client 2",
            email: "client2@email.com"
        },
        {
            name: "Client 3",
            email: "client4@email.com"
        },
        {
            name: "Client 4",
            email: "client4@email.com"
        },
    ]

    return (
        <main className={styles.root}>
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>
                    Meus clientes
                </h2>
                <ul className={styles.clientList}>
                    {clients.map(client => (
                        <Card
                            key={client.email}
                        >
                            <p>{client.name}</p>
                            <p>{client.email}</p>
                        </Card>
                    ))}
                </ul>
            </section>
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>
                    Eventos
                </h2>
            </section>
        </main>
    )
}