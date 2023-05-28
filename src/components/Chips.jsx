import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
export default function Chips() {
    const handleClick = () => {
        console.info('You clicked the Chip.');
    };

    return (

        <Stack
                sx={{
                    display:"flex",
                    gap: 2,
                    flexDirection: "row",
                    flexWrap:"wrap",
                    marginTop:2,
                }}
        >
            <Chip label="Designer" variant='outlined' onClick={handleClick} />
            <Chip label="Developer" variant='outlined' onClick={handleClick} />
            <Chip label="Commercial" variant='outlined' onClick={handleClick} />
            <Chip label="Mecanik" variant='outlined' onClick={handleClick} />
            <Chip label="Carpenter" variant='outlined' onClick={handleClick} />
            <Chip icon={<AddIcon />} label="Add Skills" onClick={handleClick} />
        </Stack>
    );
}