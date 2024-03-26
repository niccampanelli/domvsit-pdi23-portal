import { Skeleton, Typography } from "@mui/material";

export default function EventEditModalAttendantsLoading() {

    return (
        <div className="flex flex-col gap-2">
            <Typography>
                <Skeleton
                    width={110}
                />
            </Typography>
            <div className="flex flex-col gap-2">
                <div className="flex flex-wrap gap-1">
                    <Skeleton
                        variant="circular"
                        width={32}
                        height={32}
                    />
                    <Skeleton
                        variant="circular"
                        width={32}
                        height={32}
                    />
                    <Skeleton
                        variant="circular"
                        width={32}
                        height={32}
                    />
                </div>
                <Skeleton
                    variant="text"
                    height={16}
                    width={240}
                />
            </div>
            <Skeleton
                variant="rectangular"
                height={42}
            />
        </div>
    )
}