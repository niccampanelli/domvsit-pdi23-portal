import Spinner from "../Spinner";
import styles from "./loadingRoutes.module.css"

export default function LoadingRoutes() {

    return (
        <div className={styles.root}>
            <Spinner
                color="primary"
            />
        </div>
    )
}