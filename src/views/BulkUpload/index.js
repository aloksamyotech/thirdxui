import { Card, Grid, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import React from 'react'
import lp from '../../assets/images/imgLp.png'
import StarIcon from '@mui/icons-material/Star';

const BulkUpload = () => {
  return (
    <>
      <Box sx={{ bgcolor: '#fff', minHeight: '50vh', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', minHeight: '30vh', border: '1px dotted #adadad', paddingX: '100px', borderRadius: '10px' }}>
          <Typography>Drag or <span style={{ textDecoration: 'underline', color: '#0c8ce9' }}>Upload a file</span></Typography>
        </Box>
      </Box>
      <Typography sx={{ marginY: '20px' }}>or Update Template</Typography>
      <Grid container spacing={2}>
        <Grid item>
          <Card sx={{ p: '20px', width: '400px', boxShadow: '1px 1px 2px #b3b3b3' }}>
            <Stack direction='row'>
              <Stack>
                <Box sx={{ height: '100px', width: '100px' }}>
                  <img src={lp} alt="" height='100%' width='100%' style={{ objectFit: 'contain' }} />
                </Box>
              </Stack>
              <Stack sx={{ ml: '10px' }}>
                <Typography fontSize='17px'>Data Preparation Template</Typography>
                <Stack direction='row' sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: '10px' }}>
                  <Stack direction='row'>
                    <StarIcon fontSize='small' sx={{ color: '#fdb528' }} />
                    <StarIcon fontSize='small' sx={{ color: '#fdb528' }} />
                    <StarIcon fontSize='small' sx={{ color: '#fdb528' }} />
                    <StarIcon fontSize='small' sx={{ color: '#fdb528' }} />
                    <StarIcon fontSize='small' sx={{ color: '#d8d8dd' }} />
                  </Stack>
                  <Stack>
                    <Typography textAlign='end' sx={{ mt: '5px' }}>4 Star | 98 Reviews</Typography>
                  </Stack>
                </Stack>
                <Typography sx={{ fontSize: '10px', mt: '10px' }}>Download this template to use when preparing your data for upload</Typography>
                <Typography color='secondary' sx={{ mt: '15px' }}>Download</Typography>
              </Stack>
            </Stack>
          </Card>
        </Grid>
        <Grid item>
          <Card sx={{ p: '20px', width: '400px', boxShadow: '1px 1px 2px #b3b3b3' }}>
            <Stack direction='row'>
              <Stack>
                <Box sx={{ height: '100px', width: '100px' }}>
                  <img src={lp} alt="" height='100%' width='100%' style={{ objectFit: 'contain' }} />
                </Box>
              </Stack>
              <Stack sx={{ ml: '10px' }}>
                <Typography fontSize='17px'>Data Preparation Template</Typography>
                <Stack direction='row' sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: '10px' }}>
                  <Stack direction='row'>
                    <StarIcon fontSize='small' sx={{ color: '#fdb528' }} />
                    <StarIcon fontSize='small' sx={{ color: '#fdb528' }} />
                    <StarIcon fontSize='small' sx={{ color: '#fdb528' }} />
                    <StarIcon fontSize='small' sx={{ color: '#fdb528' }} />
                    <StarIcon fontSize='small' sx={{ color: '#d8d8dd' }} />
                  </Stack>
                  <Stack>
                    <Typography textAlign='end' sx={{ mt: '5px' }}>4 Star | 98 Reviews</Typography>
                  </Stack>
                </Stack>
                <Typography sx={{ fontSize: '10px', mt: '10px' }}>Download this template to use when preparing your data for upload</Typography>
                <Typography color='secondary' sx={{ mt: '15px' }}>Download</Typography>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default BulkUpload