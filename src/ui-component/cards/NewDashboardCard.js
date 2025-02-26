import { Grid, Typography } from '@mui/material'
import { Box, Container, Stack } from '@mui/system'
import React from 'react'
import photo from '../../assets/images/cardImg.png'
const NewDashboardCard = ({ val1, val2, val3, val4 }) => {
  return (
    <Container sx={{ height: '130px', width: '220px', borderRadius: '20px', bgcolor: '#fff', display: 'flex', alignItems: 'center' }}>
      <Box>
        <Typography variant='h6' sx={{ fontWeight: '500', color: '#666666' }}>{val1}</Typography>
        <Typography variant='h6' color='secondary' sx={{ bgcolor: '#c8bae3', borderRadius: '20px', textAlign: 'center', mt: '3px', fontSize: '10px' }}>{val2}</Typography>
        <Stack direction='row' sx={{ mt: '10px' }}>
          <Typography sx={{ color: '#666666', fontSize: '20px' }}>{val3}</Typography>
          <Typography sx={{ color: '#41c048', mt: '5px', fontSize: '10px' }}>{val4}</Typography>
        </Stack>
      </Box>
      <Box>
        <img src={photo} alt='' style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
      </Box>
    </Container>
  )
}

export default NewDashboardCard