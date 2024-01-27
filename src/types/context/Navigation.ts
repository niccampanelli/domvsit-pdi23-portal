
export interface INavigationContext {
    navbarOpen: boolean
    toggleNavbar: (open?: boolean) => void
    navigationItems: INavigationItem[]
    currentNavigationItem?: INavigationItem
}

export type INavigationItems = Record<string, INavigationItem[]>

export interface INavigationItem {
    name: string
    path: string
}

export interface INavigationProviderProps {
}