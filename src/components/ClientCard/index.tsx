import { Card, CardHeader } from "@mui/material";
import { IClientCardProps } from "../../types/components/ClientCard";

export default function ClientCard({
    client
}: IClientCardProps) {

    return (
        <Card>
            <CardHeader
                title={client.name}
                subheader={client.email}
            />
        </Card>
    )
}