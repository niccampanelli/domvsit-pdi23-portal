import { Outlet } from "react-router-dom"
import banner from "../../assets/images/office.jpg"
import Logo from "../../components/Logo"
import styles from "./auth.module.css"

export default function Auth() {

    return (
        <div className={styles.root}>
            <section className={styles.card}>
                <div className={styles.logoContainer}>
                    <Logo />
                </div>
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