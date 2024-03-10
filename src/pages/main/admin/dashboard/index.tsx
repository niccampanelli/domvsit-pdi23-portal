import styles from "./dashboard.module.css";
import ClientSection from "./sections/clientSection";
import EventSection from "./sections/eventSection";

export default function Dashboard() {

    return (
        <main className={styles.root}>
            <ClientSection />
            <EventSection />
        </main>
    )
}