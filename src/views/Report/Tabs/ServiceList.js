import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import React from 'react'
import DoneIcon from '@mui/icons-material/Done';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';

const ServiceList = () => {

    const rows = [
        { id: 1, userid: 'D-123', name: 'Snow', dob: '27-03-04', age: '20', country: 'India', gender: 'Male', ethicity: 'Black', no: '1234561234' },
    ];
    const columns = [
        {
            field: 'userid',
            headerName: 'User ID',
            flex: 1,
            renderCell: (params) =>
                <Typography >{params?.value}</Typography>
        },
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            renderCell: (params) =>
                <Typography >{params?.value}</Typography>
        },
        {
            field: 'dob',
            headerName: 'Date of Birth',
            flex: 1,
            renderCell: (params) =>
                <Typography color='secondary' sx={{ textDecoration: 'underline' }}>{params?.value}</Typography>
        },
        {
            field: 'age',
            headerName: 'Age',
            flex: 1,
            renderCell: (params) =>
                <Button size='small' variant="outlined" startIcon={<DoneIcon />} sx={{ p: 0, m: 0, borderRadius: '10px', color: '#adadad', border: '1px solid #d4d4d4' }}>
                    {params.value}
                </Button>
        },
        {
            field: 'country',
            headerName: 'Country',
            flex: 1,
            renderCell: (params) =>
                <Typography >{params?.value}</Typography>
        },
        {
            field: 'gender',
            headerName: 'Gender',
            flex: 1,
            renderCell: (params) =>
                <Typography >{params?.value}</Typography>
        },
        {
            field: 'ethicity',
            headerName: 'Ethicity',
            flex: 1,
            renderCell: (params) =>
                <Typography >{params?.value}</Typography>
        },
        {
            field: 'no',
            headerName: 'Contact No.',
            flex: 1,
            renderCell: (params) =>
                <Typography >{params?.value}</Typography>
        },
    ];

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end',paddingY:'10px',mr:'10px' }}>
                <Box>
                    <FilterAltIcon fontSize='small' sx={{ marginX: '4px', cursor: 'pointer' }} onClick={() => setFilter(true)} />
                    <DownloadIcon fontSize='small' sx={{ marginX: '4px' }} />
                    <PrintIcon fontSize='small' sx={{ marginX: '4px' }} />
                    <SystemUpdateAltIcon fontSize='small' sx={{ marginX: '4px' }} />
                </Box>
            </Box>
            <Box height='500px' width='100%'>
                <DataGrid
                    rows={rows ? rows : []}
                    columns={columns}
                    getRowId={(rows) => rows?.id}
                    checkboxSelection
                    sx={{
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#eeeeee',
                        },
                    }}
                />
            </Box>
        </>
    )
}

export default ServiceList