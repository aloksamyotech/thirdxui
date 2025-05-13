import React from 'react'
import { Box, Stack } from '@mui/system';
import { Button, TextField, Typography } from '@mui/material';

const Survey = () => {
  return (
    <>
      <Stack direction='row' sx={{ marginX: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Stack>
          <Typography>Which Survey / Questionare Would you like to run a report on ?</Typography>
          <TextField placeholder='please choose a survey'></TextField>
        </Stack>
        <Stack>
          <Box>
            <Button variant='contained' sx={{background:'#053146'}}>Apply</Button>
            <Button variant='outlined' color='error' sx={{ ml: '10px' }}>Clear</Button>
          </Box>
        </Stack>
      </Stack>

    </>
  )
}

export default Survey