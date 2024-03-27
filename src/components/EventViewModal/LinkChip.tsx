import { LinkOutlined } from "@mui/icons-material";
import { Chip, Tooltip } from "@mui/material";
import { IEventViewModalLinkChipProps } from "../../types/components/EventViewModal";
import { Variants, motion } from "framer-motion";

const chipVariants: Variants = {
    initial: {
        opacity: 0.6
    },
    animate: {
        opacity: 1
    }
}

export default function EventViewModalLinkChip({
    link,
    isOcurring,
    clickCallback
}: IEventViewModalLinkChipProps) {

    return (
        <Tooltip
            title={isOcurring ? "O evento está acontecendo neste link!" : "O evento ocorrerá neste link"}
            arrow
        >
            <motion.div
                variants={chipVariants}
                initial="initial"
                animate="animate"
                transition={{
                    repeat: isOcurring ? Infinity : 0,
                    repeatType: "mirror",
                    duration: 0.4,
                }}
                onClick={clickCallback}
            >
                <Chip
                    icon={
                        <LinkOutlined />
                    }
                    label={link}
                    clickable
                    component="a"
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    color={isOcurring ? "primary" : "default"}
                />
            </motion.div>
        </Tooltip>
    )
}