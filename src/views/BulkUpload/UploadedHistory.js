import React, { useState } from 'react';
import {
    Box,
    Typography,
    IconButton,
    Paper,
    Divider,
} from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DownloadIcon from '@mui/icons-material/Download';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import FileDownloadSharpIcon from '@mui/icons-material/FileDownloadSharp';
import { IconTrash, IconPencil } from '@tabler/icons';

const UploadedHistory = () => {
    const [files, setFiles] = useState([
        { name: 'Document-attachment-1.xlxs', url: '/files/Document-attachment-1.pdf' },
        { name: 'Document-attachment-2.xlxs', url: '/files/Document-attachment-2.pdf' },
        { name: 'Document-attachment-3.csv', url: '/files/Document-attachment-3.pdf' },
    ]);

    const handleDelete = (index) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
    };

    const handleDownload = (url) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = url.split('/').pop();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Box mt={1}>
            <Typography variant="subtitle1" fontWeight={500} mb={2}>
                Uploaded History
            </Typography>

            <Paper
                variant="outlined"
                sx={{
                    borderRadius: 2,
                    overflow: 'hidden',
                    backgroundColor: '#fff',
                }}
            >
                {files.map((file, index) => (
                    <React.Fragment key={index}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                px: 2,
                                py: 1.5,
                            }}
                        >
                            <Box display="flex" alignItems="center" gap={1.5}>
                                <DescriptionOutlinedIcon sx={{ color: '#4f4f4f' }} />
                                <Typography
                                    variant="body2"
                                    sx={{ color: '#4f4f4f', fontWeight: 500 }}
                                >
                                    {file.name}
                                </Typography>
                            </Box>

                            <Box>
                                <IconButton onClick={() => handleDownload(file.url)}>
                                    <FileDownloadSharpIcon sx={{ color: '#555' }} />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(index)}>
                                    <Box component="span" sx={{ color: '#F44336' }}>
                                        <IconTrash size={20} />
                                    </Box>
                                </IconButton>
                            </Box>
                        </Box>
                        {index < files.length - 1 && <Divider />}
                    </React.Fragment>
                ))}
            </Paper>
        </Box>
    );
};

export default UploadedHistory;
