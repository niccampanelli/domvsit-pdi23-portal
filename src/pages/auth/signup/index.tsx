import Button from '../../../components/Button';
import styles from '../auth.module.css';

export default function SignUp() {

    return (
        <div className={styles.form}>
            <Button
                link
                to="/login"
            >
                Faça login
            </Button>
        </div>
    )
}