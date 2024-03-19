import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { IClientCardMenuProps } from "../../types/components/ClientCard";

export default function ClientCardMenu({
    options,
    anchorEl,
    onClose
}: IClientCardMenuProps) {

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