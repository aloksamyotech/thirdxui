import { Box, Stack } from '@mui/system'
import React from 'react'
import { Card, Typography } from '@mui/material';
import { Person } from '@mui/icons-material';
import SpeakerGroupIcon from '@mui/icons-material/SpeakerGroup';
import GroupsIcon from '@mui/icons-material/Groups';
import BusinessIcon from '@mui/icons-material/Business';
import PublicIcon from '@mui/icons-material/Public';
import DynamicFormIcon from '@mui/icons-material/DynamicForm';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import { useNavigate } from 'react-router';
const Shortcut = ({ icon, title, path }) => {
    const navigate = useNavigate()

    return (
        <Card sx={{ display: 'flex', flexDirection: 'row', cursor: 'pointer' }} onClick={() => (navigate(path))}>
            <Stack sx={{ bgcolor: '#4682b4', p: '10px' }}>
                {icon == 1 && <Person sx={{ color: '#fff', fontSize: '40px' }} />}
                {icon == 2 && <SpeakerGroupIcon sx={{ color: '#fff', fontSize: '40px' }} />}
                {icon == 3 && <GroupsIcon sx={{ color: '#fff', fontSize: '40px' }} />}
                {icon == 4 && <BusinessIcon sx={{ color: '#fff', fontSize: '40px' }} />}
                {icon == 5 && <PublicIcon sx={{ color: '#fff', fontSize: '40px' }} />}
                {icon == 6 && <DynamicFormIcon sx={{ color: '#fff', fontSize: '40px' }} />}
                {icon == 7 && <Diversity2Icon sx={{ color: '#fff', fontSize: '40px' }} />}
                {icon == 8 && <PermMediaIcon sx={{ color: '#fff', fontSize: '40px' }} />}
            </Stack>
            <Typography sx={{ bgcolor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', ml: '10px' }}>{title}</Typography>
        </Card>
    )
}

export default Shortcut