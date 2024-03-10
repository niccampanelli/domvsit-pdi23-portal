import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import styles from "./main.module.css";

export default function Main() {

    return (
        <div className={styles.root}>
            <Navbar />
            <div className={styles.content}>
                <Header />
                <Outlet />
            </div>
        </div>
    )
}