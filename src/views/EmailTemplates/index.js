/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from 'react-router-dom';
// @mui
import { Stack, Button, Container, Typography, Card, Box } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import Iconify from '../../ui-component/iconify';
// import AddEmailTemplates from './AddTemplates';

// ----------------------------------------------------------------------

const documentData = [
  {
    id: 1,
    templatesName: 'Heading',
    createdOn: '09/01/2024',
    modifiedOn: '09/01/2024',
    createdBy: 'user '
  }
];
const EmailTemplates = () => {
  const columns = [
    {
      field: 'templatesName',
      headerName: 'Templates Name',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize'
    },
    {
      field: 'createdOn',
      headerName: 'Created On',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'modifiedOn',
      headerName: 'ModifiedOn',
      flex: 1
    },
    {
      field: 'createdBy',
      headerName: 'Created By',
      flex: 1
    }
  ];
  return (
    <>
      {/* <AddEmailTemplates /> */}
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h4">Email Templates Lists</Typography>
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              <Link to="/dashboard/emailtemplate/addTemplates" style={{ textDecoration: 'none', color: 'white' }}>
                New Template
              </Link>
            </Button>
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <DataGrid
                rows={documentData}
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

export default EmailTemplates;
