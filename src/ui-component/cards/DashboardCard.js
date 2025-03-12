import React from 'react'
import Typography from '@mui/material/Typography'
import { Card, Grid } from '@mui/material'
import { Box, Container } from '@mui/system'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const DashboardCard = ({ title, num1, num2, color, color2 }) => {
    return (
        <Container sx={{
            bgcolor: '#fff',
            color: '#053146',
            height: '130px',
            // width: '220px',
            width: 'auto',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #053146'
        }}>
            <Grid container spacing={1}>
                <Grid item container xs={8} sx={{
                    alignItems: "center",
                }}>
                    <Typography sx={{ fontSize: '15px' }}>{title}</Typography>
                </Grid>
                <Grid item container xs={4} sx={{
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <TrendingUpIcon sx={{ color: '#fff', width: '50px', bgcolor: '#053146', borderRadius: '20px' }} />
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