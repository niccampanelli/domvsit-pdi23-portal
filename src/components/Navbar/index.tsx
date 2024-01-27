import { AnimatePresence, Variants, motion } from "framer-motion"
import { NavLink } from "react-router-dom"
import { useNavigationContext } from "../../context/Navigation"
import Logo from "../Logo"
import styles from "./navbar.module.css"
import { classes } from "../../util/classes"

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
                                    <NavLink
                                        to={item.path}
                                        className={({ isActive }) => {
                                            return classes(
                                                styles.item,
                                                isActive ? styles.active : ""
                                            )
                                        }}
                                    >
                                        {item.icon &&
                                            <item.icon
                                                className={styles.icon}
                                            />
                                        }
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