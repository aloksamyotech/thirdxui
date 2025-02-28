import React from 'react'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import PrintIcon from '@mui/icons-material/Print';
import { Box, Stack } from '@mui/system';
import { Button, TextField, Typography } from '@mui/material';

const Survey = () => {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', paddingY: '10px', mr: '10px' }}>
        <Box>
          <FilterAltIcon fontSize='small' sx={{ marginX: '4px', cursor: 'pointer' }} onClick={() => setFilter(true)} />
          <PrintIcon fontSize='small' sx={{ marginX: '4px' }} />
        </Box>
      </Box>
      <Stack direction='row' sx={{ marginX: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Stack>
          <Typography>Which Survey / Questionare Would you like to run a report on ?</Typography>
          <TextField placeholder='please choose a survey'></TextField>
        </Stack>
        <Stack>
          <Box>
            <Button variant='contained' color='secondary'>Apply</Button>
            <Button variant='outlined' color='secondary' sx={{ ml: '10px' }}>Clear</Button>
          </Box>
        </Stack>
      </Stack>

    </>
  )
}

export default Survey