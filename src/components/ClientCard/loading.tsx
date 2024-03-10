import { Avatar, Card, CardHeader, Skeleton, Typography } from "@mui/material";

export default function ClientCardLoading() {

    return (
        <Card>
            <CardHeader
                avatar={
                    <Skeleton
                        variant="circular"
                    >
                        <Avatar />
                    </Skeleton>
                }
                title={
                    <Typography
                        variant="h3"
                        className="font-bold text-base"
                    >
                        <Skeleton
                            variant="text"
                            width={100}
                        />
                    </Typography>
                }
                subheader={
                    <Typography
                        className="text-xs"
                    >
                        <Skeleton
                            variant="text"
                            width={150}
                        />
                    </Typography>
                }
            />
        </Card>
    )
}