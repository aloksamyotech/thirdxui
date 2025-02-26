import React from 'react'
import Typography from '@mui/material/Typography'
import { Card, Grid } from '@mui/material'
import { Box, Container } from '@mui/system'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const DashboardCard = () => {
    return (
        <Container sx={{
            backgroundImage: "linear-gradient(135deg,rgb(255, 162, 75) 0%,rgb(255, 136, 39) 100%)",
            color: '#fff',
            height: '130px',
            width: '220px',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center'
        }}>
            <Grid container>
                <Grid item xs={8}>
                    <Typography sx={{ fontSize: '15px', mt: '5px' }}>Actice Service User</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Box sx={{ bgcolor: 'rgb(255, 124, 17)', borderRadius: '20px', textAlign: 'center', border: '2px solid #ff8826' }}>
                        <TrendingUpIcon />
                    </Box>
                </Grid>
                <Grid item xs={8}>
                    <Typography sx={{ fontSize: '40px', fontWeight: '500' }}>234</Typography>
                </Grid>
                <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccountCircleIcon /><Typography sx={{ display: 'inline' }}>119</Typography>
                </Grid>
            </Grid>
        </Container>
    )
}

export default DashboardCard