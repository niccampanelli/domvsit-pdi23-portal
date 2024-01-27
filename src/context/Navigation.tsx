import { createContext, useContext, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { INavigationContext, INavigationItem } from "../types/context/Navigation";
import { navigationRoutes } from "./navigationItems";

const NavigationContext = createContext<INavigationContext>({
    navbarOpen: true,
    toggleNavbar: () => { },
    navigationItems: [],
    currentNavigationItem: undefined,
})

export default function NavigationProvider() {

    const [navbarOpen, setNavbarOpen] = useState(true)
    const [navigationItems, setNavigationItems] = useState<INavigationItem[]>([])
    const [currentNavigationItem, setCurrentNavigationItem] = useState<INavigationItem | undefined>(undefined)

    const { pathname } = useLocation()

    function toggleNavbar(open?: boolean) {
        setNavbarOpen(prev => open !== undefined ? open : !prev)
    }

    useEffect(() => {
        const path = pathname.split("/")[1]
        setNavigationItems(navigationRoutes[path] || [])
        setCurrentNavigationItem(navigationRoutes[path]?.find(item => item.path === pathname))
    }, [pathname])

    return (
        <NavigationContext.Provider value={{
            navbarOpen,
            toggleNavbar,
            navigationItems,
            currentNavigationItem
        }}>
            <Outlet />
        </NavigationContext.Provider>
    )
}

export const useNavigationContext = () => useContext(NavigationContext)