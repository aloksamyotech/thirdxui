import React, { useCallback } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const FileUploadBox = ({ onFileUpload }) => {
    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            onFileUpload(file);
        }
    }, [onFileUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
            'text/csv': []
        }
    });

    return (
        <Box
            {...getRootProps()}
            sx={{
                border: '2px dashed #ccc',
                borderRadius: 2,
                backgroundColor: '#f5f5f5',
                textAlign: 'center',
                p: 4,
                cursor: 'pointer',
                transition: 'border-color 0.2s',
                '&:hover': { borderColor: '#aaa' },
                marginTop: 2
            }}
        >
            <input {...getInputProps()} />

            <Box display="flex" justifyContent="center" gap={4} mb={2}>
                {['DOX', 'xlxs', 'csv'].map((type) => (
                    <Box key={type} display="flex" flexDirection="column" alignItems="center">
                        <InsertDriveFileIcon sx={{ color: '#999', fontSize: 30 }} />
                        <Typography variant="caption" color="text.secondary">
                            {type}
                        </Typography>
                    </Box>
                ))}
            </Box>

            <Typography variant="body1" mb={2}>
                {isDragActive ? 'Drop the file here...' : 'Upload By Clicking Here Or Drag And Drop Your File'}
            </Typography>

            <Button
                variant="contained"
                sx={{
                    backgroundColor: '#053146',
                    textTransform: 'none',
                    borderRadius: 2,
                    px: 3,
                    py: 1,
                    fontWeight: 500,
                    '&:hover': {
                        backgroundColor: '#053146'
                    }
                }}
            >
                Upload a file
            </Button>
        </Box>
    );
};

export default FileUploadBox;
