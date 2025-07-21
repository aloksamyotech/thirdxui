import React, { useState } from 'react';
import {
    Box,
    Typography,
    Link,
    MenuItem,
    FormControl,
    Select,
    InputLabel,
    FormHelperText
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';

const sampleFiles = {
    users: {
        name: 'service_user_sample_file.xlsx',
        path: '/sampleFiles/service_user_sample_file.xlsx'
    },
    services: {
        name: 'services_sample_file.xlsx',
        path: '/sampleFiles/services_sample_file.xlsx'
    },
    cases: {
        name: 'case_sample_file.xlsx',
        path: '/sampleFiles/case_sample_file.xlsx'
    },
    donors: {
        name: 'donors-template.xlsx',
        path: '/sampleFiles/service_donorSample_file.xlsx'
    }
};


const BulkUploadActions = ({ uploadType, setUploadType }) => {

    const [error, setError] = useState(false);

    const handleDownload = () => {
        if (!uploadType) {
            setError(true);
            return;
        }

        const template = sampleFiles[uploadType];
        if (template) {
            const link = document.createElement('a');
            link.href = template.path;
            link.setAttribute('download', template.name);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const handleChange = (event) => {
        setUploadType(event.target.value);
        setError(false);
    };

    return (
        <Box display="flex" gap={2} flexWrap="wrap" mt={2}>
            <Box
                sx={{
                    flex: 1,
                    border: '1px solid #e0e0e0',
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    px: 2,
                    py: 2,
                    cursor: 'pointer',
                    minWidth: '250px',
                    backgroundColor: 'white',
                    pointerEvents: uploadType ? 'auto' : 'none'
                }}
                onClick={handleDownload}
            >
                <DownloadIcon sx={{ color: '#004d66', mr: 1 }} fontSize="small" />
                <Link underline="hover" sx={{ fontWeight: 500, color: '#0077b6', pointerEvents: 'none' }}>
                    {uploadType ? `Download ${uploadType} sample file` : 'Download our .xlsx template'}
                </Link>
            </Box>

            <FormControl
                sx={{
                    flex: 1,
                    minWidth: '250px',
                    border: '1px solid #e0e0e0',
                    borderRadius: 2,
                    px: 2,
                    py: 0.5,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: 'white'
                }}
                error={error}
                required
            >
                <UploadIcon sx={{ color: '#004d66', mr: 1 }} fontSize="small" />
                <Select
                    displayEmpty
                    value={uploadType}
                    onChange={handleChange}
                    variant="standard"
                    disableUnderline
                    sx={{ flexGrow: 1 }}
                >
                    <MenuItem value="" disabled>
                        Bulk Upload For...
                    </MenuItem>
                    <MenuItem value="users">User Services</MenuItem>
                    <MenuItem value="services">Services</MenuItem>
                    <MenuItem value="cases">Cases</MenuItem>
                    <MenuItem value="donors">Donor Management</MenuItem>
                </Select>
                {error && (
                    <FormHelperText>Select a valid type</FormHelperText>
                )}
            </FormControl>
        </Box>
    );
};

export default BulkUploadActions;
