import { Link, Outlet } from "react-router-dom"
import banner from "../../assets/images/office.jpg"
import styles from "./auth.module.css"

export default function Auth() {

    return (
        <div className={styles.root}>
            <section className={styles.card}>
                <Link
                    to="/"
                    className={styles.logoContainer}
                >
                    <h1
                        className={styles.logo}
                    >
                        Planify
                    </h1>
                </Link>
                <Outlet />
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