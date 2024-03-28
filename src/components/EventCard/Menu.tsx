import { Divider, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { IEventCardMenuProps } from "../../types/components/EventCard";

export default function EventCardMenu({
    options,
    anchorEl,
    onClose
}: IEventCardMenuProps) {

    return (
        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={onClose}
            slotProps={{
                paper: {
                    elevation: 1
                }
            }}
            MenuListProps={{
                dense: true
            }}
        >
            {options.map(option => (
                option.divider ?
                    <Divider />
                    :
                    <MenuItem
                        key={option.label}
                        onClick={option.onClick}
                    >
                        <ListItemIcon>
                            {option.icon}
                        </ListItemIcon>
                        <ListItemText
                            primary={option.label}
                        />
                    </MenuItem>
            ))}
        </Menu>
    )
}