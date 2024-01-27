import { Link } from "react-router-dom";
import styles from "./logo.module.css";

export default function Logo() {

    return (
        <Link
            to="/"
            className={styles.root}
        >
            <h1 className={styles.logo}>
                Planify
            </h1>
        </Link>
    )
}