import { Avatar, Card, CardActionArea, CardHeader, Typography } from "@mui/material";
import { IClientCardProps } from "../../types/components/ClientCard";
import getColorFromString from "../../util/getColorFromString";

export default function ClientCard({
    client
}: IClientCardProps) {

    return (
        <Card>
            <CardActionArea>
                <CardHeader
                    avatar={
                        <Avatar
                            alt={client.name}
                            sx={{
                                bgcolor: getColorFromString(client.name)
                            }}
                        >
                            {client.name[0]}
                        </Avatar>
                    }
                    title={
                        <Typography
                            variant="h3"
                            className="font-bold text-base"
                        >
                            {client.name}
                        </Typography>
                    }
                    subheader={
                        <Typography
                            className="text-xs"
                        >
                            {client.email}
                        </Typography>
                    }
                />
            </CardActionArea>
        </Card>
    )
}