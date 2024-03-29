import AdminDashboardMarkedUnmarkedChart from "./MarkedUnmarkedChart";
import AdminDashboardShowedUpByClientChart from "./ShowedUpByClientChart";
import AdminDashboardShowedUpChart from "./ShowedUpChart";

export default function AdminDashboardChartSection() {

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-wrap gap-8">
                <AdminDashboardShowedUpChart />
                <AdminDashboardMarkedUnmarkedChart />
            </div>
            <AdminDashboardShowedUpByClientChart />
        </div>
    )
}