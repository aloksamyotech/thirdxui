import React from 'react'
import Typography from '@mui/material/Typography'
import { Card, Grid } from '@mui/material'
import { Box, Container } from '@mui/system'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const DashboardCard = ({ title, num1, num2, color, color2 }) => {
    return (
        <Container sx={{
            backgroundImage: color,
            color: '#fff',
            height: '130px',
            // width: '220px',
            width: 'auto',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center'
        }}>
            <Grid container>
                <Grid item xs={8}>
                    <Typography sx={{ fontSize: '15px', mt: '5px' }}>{title}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Box sx={{ bgcolor: color2, borderRadius: '20px', textAlign: 'center', border: `2px solid ${color2}` }}>
                        <TrendingUpIcon />
                    </Box>
                </Grid>
                <Grid item xs={8}>
                    <Typography sx={{ fontSize: '40px', fontWeight: '500' }}>{num1}</Typography>
                </Grid>
                <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccountCircleIcon /><Typography sx={{ display: 'inline' }}>{num2}</Typography>
                </Grid>
            </Grid>
        </Container>
    )
}

export default DashboardCard