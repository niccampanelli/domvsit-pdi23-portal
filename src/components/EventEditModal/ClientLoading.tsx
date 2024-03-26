import { Card, CardHeader, Skeleton, Typography } from "@mui/material";

export default function EventEditModalClientLoading() {

    return (
        <div className="flex flex-col gap-2">
            <Typography>
                <Skeleton
                    width={52}
                />
            </Typography>
            <Card
                variant="outlined"
            >
                <CardHeader
                    avatar={
                        <Skeleton
                            variant="circular"
                            width={32}
                            height={32}
                        />
                    }
                    title={
                        <Typography>
                            <Skeleton
                                width={140}
                            />
                        </Typography>
                    }
                />
            </Card>
        </div>
    )
}