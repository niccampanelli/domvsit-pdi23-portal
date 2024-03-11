import { LinkOutlined } from "@mui/icons-material"
import { Card, CardActionArea, CardContent, Chip, Typography, styled } from "@mui/material"
import moment from "moment"
import { IEventCardProps } from "../../types/components/EventCard"

const StyledCard = styled(Card)(({ theme }) => ({
    borderTop: `8px solid ${theme.palette.primary.main}`
}))

export default function EventCard({
    event,
    onClick = () => { }
}: IEventCardProps) {

    function getFormattedOcurrence(ocurrence: Date) {
        return moment(ocurrence).format("ddd, DD [de] MMM")
    }

    function getTruncatedDescription(description: string) {
        if (description.length > 40) {
            return description.slice(0, 60) + "..."
        }
        return description
    }

    return (
        <StyledCard>
            <CardActionArea
                onClick={onClick}
            >
                <CardContent>
                    <div className="flex flex-row gap-2 mb-4">
                        <Chip
                            label={getFormattedOcurrence(event.ocurrence)}
                            color="primary"
                            size="small"
                        />
                        {event.link &&
                            <Chip
                                icon={<LinkOutlined />}
                                label="Link"
                                size="small"
                            />
                        }
                    </div>
                    <Typography
                        variant="h3"
                        className="text-lg font-bold mb-2"
                    >
                        {event.title}
                    </Typography>
                    <Typography>
                        {getTruncatedDescription(event.description)}
                    </Typography>
                    {event.tags &&
                        <div className="flex flex-row flex-wrap gap-2 mt-4">
                            {event.tags.map(tag =>
                                <Chip
                                    key={tag}
                                    label={tag}
                                    size="small"
                                />
                            )}
                        </div>
                    }
                </CardContent>
            </CardActionArea>
        </StyledCard>
    )
}