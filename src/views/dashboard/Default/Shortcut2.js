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
const Shortcut2 = ({ icon, title, path }) => {
    const navigate = useNavigate()

    return (
        <Card sx={{ display: 'flex', flexDirection: 'row', cursor: 'pointer', border: '1px solid #00000033', justifyContent: 'center', alignItems: 'center', py: '10px' }} onClick={() => (navigate(path))}>
            {icon == 1 && <Person sx={{ fontSize: '30px' }} />}
            {icon == 2 && <SpeakerGroupIcon sx={{ fontSize: '30px' }} />}
            {icon == 3 && <GroupsIcon sx={{ fontSize: '30px' }} />}
            {icon == 4 && <BusinessIcon sx={{ fontSize: '30px' }} />}
            <Typography sx={{ ml: '5px' }}>{title}</Typography>
        </Card>
    )
}

export default Shortcut2