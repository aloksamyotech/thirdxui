import { Grid, Typography } from '@mui/material'
import { Box, Container, Stack } from '@mui/system'
import React from 'react'
import photo from '../../assets/images/cardImg.png'
const NewDashboardCard = () => {
  return (
    <Container sx={{ height: '130px', width: '220px', borderRadius: '20px', bgcolor: '#fff', display: 'flex', alignItems: 'center' }}>
      <Box>
        <Typography variant='h6' sx={{ fontWeight: '500', color: '#666666' }}>Company Value</Typography>
        <Typography variant='h6' color='secondary' sx={{ bgcolor: '#c8bae3', borderRadius: '20px', textAlign: 'center', mt: '3px', fontSize: '10px' }}>Year of 2024</Typography>
        <Stack direction='row' sx={{ mt: '10px' }}>
          <Typography sx={{ color: '#666666', fontSize: '20px' }}>$5000</Typography>
          <Typography sx={{ color: '#41c048', mt: '5px', fontSize: '10px' }}>+15.6%</Typography>
        </Stack>
      </Box>
      <Box>
        <img src={photo} alt='' style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
      </Box>
    </Container>
  )
}

export default NewDashboardCard