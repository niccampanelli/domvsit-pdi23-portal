import styles from "./admin.module.css";
import ClientSection from "./sections/clientSection";
import EventSection from "./sections/eventSection";

export default function Admin() {

    return (
        <main className={styles.root}>
            <ClientSection />
            <EventSection />
        </main>
    )
}