import { Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';

const EmptyCard = () => {
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '350px', bgcolor: '#fff', borderRadius: '10px' }}>
      <Typography sx={{ fontSize: '18px',display:'flex',alignItems:'center' }}><AddIcon /> Add New Widget</Typography>
    </Container>
  )
}

export default EmptyCard