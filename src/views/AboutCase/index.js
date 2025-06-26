// import React from 'react'

// const AboutCase = () => {
//   return (
//     <div>AboutCase</div>
//   )
// }

// export default AboutCase;

import { useState, useEffect } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Avatar,
    Button,
    Grid,
    IconButton,
    MenuItem,
    Divider,
    TextField,
    Stack,
    Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import InfoIcon from '@mui/icons-material/Info';
import { useLocation, useNavigate } from 'react-router-dom';
import Background from 'assets/images/UserProfile.png';
import FilterPanel from 'components/FilterPanel';
import { urls } from 'common/urls';
import { getApi } from 'common/apiClient';
import { imageUrl } from 'common/urls';
import SingleRowLoader from 'ui-component/Loader/SingleRowLoader';
import { toast } from 'react-hot-toast';
import SectionSkeleton from 'ui-component/Loader/SectionSkeleton';
import config from '../../config';
import AboutCaseCard from './AboutCaseCard';
import CaseTagCard from './CaseTagCard';
import OptionsPopover from 'components/AddFilter';

const AboutCase = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const serviceId = location.state?.row?._id || location.state?.row || location.state?.serviceId;
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const open = Boolean(anchorEl);

    const groupedTags = [
        {
            category: 'Health',
            tags: ['Mental Health', 'Wellness', 'Wellness', 'Wellness', 'Wellness']
        },
        {
            category: 'Support',
            tags: ['Housing', 'Employment']
        }
    ];

    return (
        <>

            <Grid item xs={12} mb={2}>
                <Stack direction="row" alignItems="center">
                    <Typography fontWeight="bold" display="flex" alignItems="center">
                        <IconButton onClick={() => navigate(-1)}>
                            <KeyboardBackspaceIcon sx={{ fontSize: 20, color: 'black' }} />
                        </IconButton>
                        Back
                    </Typography>
                </Stack>
            </Grid>


            <Grid container sx={{ p: 1 }}>
                <Grid item xs={12} md={6}>
                    <AboutCaseCard />
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                >
                    <CaseTagCard groupedTags={groupedTags} />

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        <Button
                            variant="contained"
                            onClick={handleClick}
                            sx={{
                                borderRadius: '6px',
                                width: '100px',
                                height: '36px',
                                fontSize: '12px',
                                backgroundColor: '#009fc7',
                                '&:hover': {
                                    backgroundColor: '#009fc7',
                                },
                            }}
                        >
                            Manage
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => navigate(-1)}
                            sx={{
                                borderRadius: '6px',
                                width: '100px',
                                height: '36px',
                                fontSize: '12px'
                            }}
                        >
                            CLOSE
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            <OptionsPopover open={open} anchorEl={anchorEl} onClose={handleClose} />
        </>
    );
};

export default AboutCase;
