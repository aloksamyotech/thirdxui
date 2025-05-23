import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const SingleRowLoader = () => {
    return (
        <Box
            sx={{
                width: '100%',

                padding: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
        >
            {[...Array(5)].map((_, index) => (
                <Skeleton key={index}
                    variant="rectangular"
                    height={40}
                    animation="wave"
                    sx={{
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    }}
                />
            ))}
        </Box>
    )
}

export default SingleRowLoader;