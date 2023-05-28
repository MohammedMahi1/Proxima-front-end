import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box, IconButton, Tooltip } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FileUploader from './FileUploader';
export default function MenuProfile() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    return (
        <Box sx={{
            gridColumn: "4/5",
            gridRow: "4/5",
        }}>

            <Tooltip title="menu"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                variant="Button"
                sx={{
                    margin: 1,
                }}
            >
                <IconButton>
                    <MoreVertIcon/>
                </IconButton>
            </Tooltip>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}

            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem><FileUploader type="profile" label="Upload Profile picture"/></MenuItem>
                <MenuItem><FileUploader type="cover" label="Upload cover picture"/></MenuItem>
            </Menu>
        </Box >
    );
}