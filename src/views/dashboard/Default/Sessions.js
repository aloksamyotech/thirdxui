import { Divider, Input, MenuItem, Select, Typography } from '@mui/material'
import { Box, Container, Stack } from '@mui/system'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

const Sessions = () => {
    return (
        <Box sx={{ bgcolor: '#fff', p: '10px',borderRadius:'10px' }}>
            <Stack direction='row' sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Current Sessions</Typography>
                <Stack direction='row'>
                    <Input placeholder='Type to filter' sx={{ border: 'none' }}></Input>
                    <SearchIcon sx={{ mt: '2px' }} />
                </Stack>
            </Stack>
            <Stack>
                <Select
                    value=''
                    displayEmpty
                    sx={{
                        border: 'none',
                        '& fieldset': { border: 'none' },
                        "& .MuiSelect-select": {
                            opacity: '0.8'
                        },
                        borderRadius: 0,
                        width: '100%',
                    }}
                >
                    <MenuItem value=''>Last Four Weeks</MenuItem>
                    <MenuItem value='two'>Twenty</MenuItem>
                    <MenuItem value='three'>Thirty</MenuItem>
                </Select>
            </Stack>
            <Stack sx={{ paddingX: '10px', marginTop: '5px' }}>
                <Stack direction='row' sx={{ paddingY: '5px' }}>
                    <Stack>
                        <Stack><Typography sx={{ fontSize: '12px' }}>25 oct 2021</Typography></Stack>
                        <Stack><Typography sx={{ fontSize: '11px' }}>18:00</Typography></Stack>
                    </Stack>
                    <Stack sx={{ ml: '10px' }}>
                        <Stack><Typography sx={{ opacity: '0.9', fontSize: '12px' }}>Cover Letter Writing - Group Session</Typography></Stack>
                        <Stack><Typography sx={{ opacity: '0.9', fontSize: '12px' }}>Market Road ATP - you</Typography></Stack>
                        <Stack direction='row' sx={{ mt: '5px' }}>
                            <Stack><Typography sx={{ color: 'blue', fontSize: '12px' }}>Edit Session</Typography></Stack>
                            <Stack sx={{ borderLeft: '1px solid #000', paddingLeft: '5px', marginLeft: '5px' }}><Typography sx={{ color: 'blue', fontSize: '12px' }}>Add Register</Typography></Stack>
                        </Stack>
                    </Stack>
                </Stack>
                <Divider />
                <Stack direction='row' sx={{ paddingY: '5px' }}>
                    <Stack>
                        <Stack><Typography sx={{ fontSize: '12px' }}>25 oct 2021</Typography></Stack>
                        <Stack><Typography sx={{ fontSize: '11px' }}>18:00</Typography></Stack>
                    </Stack>
                    <Stack sx={{ ml: '10px' }}>
                        <Stack><Typography sx={{ opacity: '0.9', fontSize: '12px' }}>Cover Letter Writing - Group Session</Typography></Stack>
                        <Stack><Typography sx={{ opacity: '0.9', fontSize: '12px' }}>Market Road ATP - you</Typography></Stack>
                        <Stack direction='row' sx={{ mt: '5px' }}>
                            <Stack><Typography sx={{ color: 'blue', fontSize: '12px' }}>Edit Session</Typography></Stack>
                            <Stack sx={{ borderLeft: '1px solid #000', paddingLeft: '5px', marginLeft: '5px' }}><Typography sx={{ color: 'blue', fontSize: '12px' }}>Add Register</Typography></Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Box>

    )
}

export default Sessions