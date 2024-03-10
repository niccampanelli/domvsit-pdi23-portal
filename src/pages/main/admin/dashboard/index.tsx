import ClientSection from "./sections/ClientSection"
import EventSection from "./sections/EventSection"

export default function AdminDashboard() {
    return (
        <div className="flex flex-1 flex-col gap-8 p-4">
            <ClientSection />
            <EventSection />
        </div>
    )
}