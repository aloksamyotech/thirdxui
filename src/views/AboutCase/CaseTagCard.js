import React from 'react';
import {
    Grid,
    Paper,
    Box,
    Typography,
    Chip
} from '@mui/material';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import CancelIcon from '@mui/icons-material/Cancel';

const CaseTagCard = ({ groupedTags = [] }) => {
    return (

        <Paper
            variant="outlined"
            sx={{
                p: 2,
                height: '540px',
                display: 'flex',
                flexDirection: 'column',
                maxHeight: '540px'
            }}
        >
         
            <Box display="flex" alignItems="center" mb={2}>
                <LocalOfferOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="subtitle1">Case Tags</Typography>
            </Box>

            <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
                {groupedTags.length === 0 ? (
                    <Typography variant="body2" color="textSecondary">
                        No tags found.
                    </Typography>
                ) : (
                    groupedTags.map((group, idx) => (
                        <Box
                            key={idx}
                            mb={2}
                            p={2}
                            sx={{
                                backgroundColor: '#F7F7F7',
                                borderRadius: 1,
                                width: '100%'
                            }}
                        >
                            <Box display="flex" alignItems="center" mb={1}>
                                <Typography variant="subtitle2">{group.category}</Typography>
                            </Box>

                            <Box display="flex" flexWrap="wrap" gap={1}>
                                {group.tags.map((tag, i) => (
                                    <Chip
                                        key={i}
                                        label={tag}
                                        onDelete={() => { }}
                                        deleteIcon={
                                            <CancelIcon
                                                sx={{
                                                    fontSize: 16,
                                                    color: '#666'
                                                }}
                                            />
                                        }
                                        sx={{
                                            backgroundColor: '#009FC7',
                                            color: '#fff',
                                            height: 28,
                                            '& .MuiChip-deleteIcon': {
                                                marginLeft: '4px'
                                            }
                                        }}
                                    />
                                ))}
                            </Box>
                        </Box>
                    ))
                )}
            </Box>
        </Paper>
    );
};

export default CaseTagCard;
