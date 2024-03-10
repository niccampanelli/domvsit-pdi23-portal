import { createContext, useContext, useEffect, useState } from "react"
import { INavigationContext, INavigationItem, INavigationProviderProps } from "../types/context/Navigation"
import { Outlet, useLocation } from "react-router-dom"
import { navigationRoutes } from "./navigationRoutes"

const NavigationContext = createContext<INavigationContext>({
    navigationItems: [],
    currentNavigation: undefined
})

export default function NavigationProvider({ }: INavigationProviderProps) {

    const { pathname } = useLocation()

    const [navigationItems, setNavigationItems] = useState<INavigationItem[]>([])
    const [currentNavigation, setCurrentNavigation] = useState<INavigationItem | undefined>(undefined)

    useEffect(() => {
        const path = pathname.split("/")[1]
        var matchingRoutes = navigationRoutes[path] || []

        matchingRoutes.forEach(route => {
            route.active = route.path === pathname
        })

        setNavigationItems(matchingRoutes)
        setCurrentNavigation(matchingRoutes.find(route => route.path === pathname))
    }, [pathname])

    return (
        <NavigationContext.Provider
            value={{
                navigationItems,
                currentNavigation
            }}
        >
            <Outlet />
        </NavigationContext.Provider>
    )
}

export const useNavigationContext = () => useContext(NavigationContext)