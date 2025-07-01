import { Grid, Typography } from '@mui/material'
import React from 'react'
import BulkUploadInfoBox from './InfoBox'
import BulkUploadActions from './BulkUploadActions'
import FileUploadBox from './FileUploadBox'
import UploadedHistory from './UploadedHistory'

const BulkUploadFile = () => {
    return (
        <>
            <Grid container spacing={1} p={2}>
                <Grid item xs={12}>
                    <Typography fontWeight="600" fontSize="16px" display="flex" alignItems="center">
                        Bulk Upload
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <BulkUploadInfoBox />
                </Grid>
                <Grid item xs={12}>
                    <BulkUploadActions />
                </Grid>
                <Grid item xs={12}>
                    <FileUploadBox />
                </Grid>
                <Grid item xs={12}>
                    <UploadedHistory />
                </Grid>
            </Grid>
        </>
    )
}

export default BulkUploadFile