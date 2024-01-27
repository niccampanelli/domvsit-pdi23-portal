import { useState } from "react"
import { useAuthContext } from "../../context/Auth"
import { useNavigationContext } from "../../context/Navigation"
import Menu from "./Menu"
import styles from "./header.module.css"
import UserIcon from "../../assets/icons/user.svg?react"

export default function Header() {

    const { currentNavigationItem } = useNavigationContext()
    const { user } = useAuthContext()

    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <header className={styles.root}>
            <h1>
                {currentNavigationItem?.name}
            </h1>
            <div>
                <div
                    className={styles.user}
                    onClick={() => setMenuOpen(prev => !prev)}
                >
                    <UserIcon className={styles.userIcon} />
                </div>
                {menuOpen &&
                    <Menu />
                }
            </div>
        </header>
    )
}