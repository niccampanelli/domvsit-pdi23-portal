import { useState } from "react"
import UserIcon from "../../assets/icons/user.svg?react"
import { useAuthContext } from "../../context/Auth"
import { useNavigationContext } from "../../context/Navigation"
import Menu from "../Menu"
import styles from "./header.module.css"

export default function Header() {

    const { currentNavigationItem } = useNavigationContext()
    const { user, logout } = useAuthContext()

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
                    <span className={styles.userName}>
                        {user?.name}
                    </span>
                    <div className={styles.userDefaultPhoto}>
                        <UserIcon className={styles.userIcon} />
                    </div>
                </div>
                {menuOpen &&
                    <Menu
                        options={[
                            {
                                name: "Sair",
                                onClick: () => logout()
                            }
                        ]}
                    />
                }
            </div>
        </header>
    )
}