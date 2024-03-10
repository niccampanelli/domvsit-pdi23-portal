import { ReactNode } from "react"

export interface INavigationItem {
    icon: ReactNode
    label: string
    path: string
    active?: boolean
}

export type NavigationItemsType = Record<string, INavigationItem[]>

export interface INavigationContext {
    navigationItems: INavigationItem[]
    currentNavigation?: INavigationItem
}

export interface INavigationProviderProps {
}