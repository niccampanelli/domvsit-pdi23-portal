import { Typography } from "@mui/material"
import { Outlet } from "react-router-dom"

export default function Auth() {

    return (
        <div className="flex w-full h-screen overflow-hidden">
            <div className="flex flex-col items-center gap-8 w-full md:w-1/2 p-8 overflow-y-auto">
                <Typography
                    variant="h1"
                    color="primary"
                    className="text-5xl font-bold"
                >
                    Planify
                </Typography>
                <Outlet />
            </div>
            <div className="w-1/2 hidden md:block h-full">
                <img
                    alt="Banner"
                    src="/images/login-banner.jpg"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    )
}