import { NavLink } from "react-router-dom"
import { useNavigationContext } from "../../context/Navigation"
import Logo from "../Logo"
import styles from "./navbar.module.css"
import { AnimatePresence, Variants, motion } from "framer-motion"

const navbarAnimationVariants: Variants = {
    initial: {
        x: "0%"
    },
    exit: {
        x: "-100%"
    }
}

export default function Navbar() {

    const {
        navbarOpen,
        toggleNavbar,
        navigationItems
    } = useNavigationContext()

    return (
        <AnimatePresence>
            {navbarOpen &&
                <motion.section
                    key="navbar"
                    className={styles.root}
                    variants={navbarAnimationVariants}
                    initial="initial"
                    exit="exit"
                    transition={{
                        duration: 0.4
                    }}
                >
                    <Logo />
                    <nav>
                        <ul className={styles.list}>
                            {navigationItems.map(item => (
                                <li key={item.name}>
                                    <NavLink to={item.path}>
                                        {item.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </motion.section>
            }
        </AnimatePresence>
    )
}