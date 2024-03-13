import { Avatar, Card, CardActionArea, CardHeader, Typography } from "@mui/material";
import { IClientCardProps } from "../../types/components/ClientCard";
import getColorFromString from "../../util/getColorFromString";
import getInitials from "../../util/getInitials";
import getTruncatedText from "../../util/getTruncatedText";

export default function ClientCard({
    client,
    onClick = () => { }
}: IClientCardProps) {

    return (
        <Card
            variant="outlined"
        >
            <CardActionArea
                onClick={onClick}
            >
                <CardHeader
                    avatar={
                        <Avatar
                            alt={client.name}
                            sx={{
                                bgcolor: getColorFromString(client.name)
                            }}
                        >
                            {getInitials(client.name)}
                        </Avatar>
                    }
                    title={
                        <Typography
                            variant="h3"
                            className="font-bold text-base"
                        >
                            {getTruncatedText(client.name, 16)}
                        </Typography>
                    }
                    subheader={
                        <Typography
                            className="text-xs"
                        >
                            {getTruncatedText(client.email, 22)}
                        </Typography>
                    }
                />
            </CardActionArea>
        </Card>
    )
}