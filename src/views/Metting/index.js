/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
// @mui
import { Stack, Button, Container, Typography, Card, Box } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import AddMeetings from './Addmeetings';

import Iconify from '../../ui-component/iconify';

// ----------------------------------------------------------------------

const meetingData = [
  {
    id: 1,
    subject: 'Task Testing',
    status: 'In progress',
    startDate: '08/01/2024',
    endDate: '09/01/2024',
    duration: '30 min',
    relatedTo: 'petter max',
    assignedUser: 'active user'
  }
];
const Meeting = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const columns = [
    {
      field: 'subject',
      headerName: 'Subject',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize'
    },

    {
      field: 'startDate',
      headerName: ' Start Date',
      flex: 1
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      flex: 1
    },
    {
      field: 'duration',
      headerName: 'Duration',
      flex: 1
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'relatedTo',
      headerName: 'Related To',
      flex: 1
    },
    {
      field: 'assignedUser',
      headerName: 'Assigned User',
      flex: 1
    }
  ];
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  return (
    <>
      <AddMeetings open={openAdd} handleClose={handleCloseAdd} />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h4">Meeting Lists</Typography>
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
              New meeting
            </Button>
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <DataGrid
                rows={meetingData}
                columns={columns}
                checkboxSelection
                getRowId={(row) => row.id}
                slots={{ toolbar: GridToolbar }}
                slotProps={{ toolbar: { showQuickFilter: true } }}
              />
            </Card>
          </Box>
        </TableStyle>
      </Container>
    </>
  );
};

export default Meeting;
