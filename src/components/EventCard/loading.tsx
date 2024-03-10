import { Card, CardContent, Skeleton, Typography, styled } from "@mui/material";

const StyledCard = styled(Card)(({ theme }) => ({
    borderTop: `8px solid ${theme.palette.primary.main}`
}))

export default function EventCardLoading() {

    return (
        <StyledCard>
            <CardContent>
                <div className="flex flex-row gap-2 mb-4">
                    <Skeleton
                        variant="rounded"
                        className="rounded-full"
                        width={80}
                        height={20}
                    />
                    <Skeleton
                        variant="rounded"
                        className="rounded-full"
                        width={80}
                        height={20}
                    />
                </div>
                <Typography
                    variant="h3"
                    className="text-lg mb-2"
                >
                    <Skeleton
                        variant="text"
                    />
                    <Skeleton
                        variant="text"
                        width={100}
                    />
                </Typography>
                <Typography>
                    <Skeleton
                        variant="text"
                    />
                    <Skeleton
                        variant="text"
                    />
                    <Skeleton
                        variant="text"
                    />
                </Typography>
                <div className="flex flex-row flex-wrap gap-2 mt-4">
                    <Skeleton
                        variant="rounded"
                        className="rounded-full"
                        width={80}
                        height={20}
                    />
                    <Skeleton
                        variant="rounded"
                        className="rounded-full"
                        width={100}
                        height={20}
                    />
                    <Skeleton
                        variant="rounded"
                        className="rounded-full"
                        width={120}
                        height={20}
                    />
                    <Skeleton
                        variant="rounded"
                        className="rounded-full"
                        width={80}
                        height={20}
                    />
                </div>
            </CardContent>
        </StyledCard>
    )
}