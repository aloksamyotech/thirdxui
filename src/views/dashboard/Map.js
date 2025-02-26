import { Input, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import map from '../../assets/images/map.png'

const Map = () => {
    return (
        <Box sx={{ bgcolor: '#fff', p: '10px', borderRadius: '10px' }}>
            <Stack direction='row' sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Where We Have Delivered Session?</Typography>
                <Stack direction='row'>
                    <Input placeholder='type to filter' sx={{ border: 'none' }}></Input>
                    <SearchIcon sx={{ mt: '2px' }} />
                </Stack>
            </Stack>
            <Stack sx={{ mt: '5px' }}>
                <img src={map} alt='' height='180px' style={{ objectFit: 'contain' }} />
            </Stack>
        </Box>
    )
}

export default Map