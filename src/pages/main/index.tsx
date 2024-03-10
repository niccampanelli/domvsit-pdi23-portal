import { Outlet } from "react-router-dom"
import Navbar from "../../components/Navbar"
import Header from "../../components/Header"

export default function Main() {

    return (
        <div className="flex w-screen h-screen">
            <Navbar />
            <div className="flex flex-col flex-1 overflow-y-auto">
                <Header />
                <Outlet />
            </div>
        </div>
    )
}