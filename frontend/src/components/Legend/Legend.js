import React from 'react';
import { Box, Typography } from '@mui/material';

const Legend = ({ colorMapping }) => {
    return (
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" fontWeight="bold">Legend</Typography>
            {Object.keys(colorMapping).map((type) => (
                <Box key={type} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box sx={{
                        width: 16,
                        height: 16,
                        backgroundColor: colorMapping[type],
                        borderRadius: '50%',
                        mr: 1
                    }} />
                    <Typography variant="body1">{type}</Typography>
                </Box>
            ))}
        </Box>
    );
};

export default Legend;
