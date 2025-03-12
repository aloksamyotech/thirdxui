import { Input, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import map from '../../assets/images/map.png'
import GoogleMap from '../../components/GoogleMap'
const Map = () => {
    return (
        <Box sx={{ bgcolor: '#fff', borderRadius: '10px', overflow: 'hidden', height: '350px' }}>
            <Stack direction='row' sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '20px' }}>
                <Typography variant='h5' sx={{ fontSize: '12px' }}>Where We Have Deliver Session ?</Typography>
                <Stack direction='row' spacing={1}>
                    <Select value='This Week' size='small'>
                        <MenuItem value='This Week'>This Week</MenuItem>
                        <MenuItem value='This Month'>This Month</MenuItem>
                        <MenuItem value='This Year'>This Year</MenuItem>
                    </Select>
                    <TextField variant='outlined' placeholder='search' size='small' />
                </Stack>
            </Stack>
            <Stack>
                <GoogleMap />
            </Stack>
        </Box>
    )
}

export default Map