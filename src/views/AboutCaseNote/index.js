import { Box, Button, Card, Grid, IconButton, Stack, Typography } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import React from 'react'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import OptionsPopover from 'components/AddFilter';
import { useLocation, useNavigate } from 'react-router';
import { useState } from 'react';

const AboutCaseNote = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const open = Boolean(anchorEl);


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

            <Grid container spacing={2} sx={{ p: 1 }}>

                <Grid item xs={12}>
                    <Card
                        variant="outlined"
                        sx={{
                            borderRadius: 2,
                            boxShadow: 0,
                            backgroundColor: '#fff',
                            p: 3,
                            width: '100%',
                            flexGrow: 1,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '16px',
                                fontWeight: 500,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                            gutterBottom
                        >
                            <BusinessCenterOutlinedIcon />
                            ABOUT CASE NOTE
                        </Typography>

                        <Box borderBottom={1} borderColor="grey.300" mb={2} mt={2} />


                        <Grid container spacing={2}>
                            <Grid item xs={6} sx={{ '& > *:not(:last-child)': { mb: '18px' }, maxWidth: '522px' }}>
                                <Typography>
                                    <Box component="span" sx={{ fontWeight: 600, fontSize: '12px', mr: 1 }}>Date:</Box>
                                    <Box component="span" sx={{ fontWeight: 400, fontSize: '12px' }}>31/10/2021</Box>
                                </Typography>
                                <Typography>
                                    <Box component="span" sx={{ fontWeight: 600, fontSize: '12px', mr: 1 }}>Contact Type:</Box>
                                    <Box component="span" sx={{ fontWeight: 400, fontSize: '12px' }}>Aidan Ayonoudu</Box>
                                </Typography>
                                <Typography>
                                    <Box component="span" sx={{ fontWeight: 600, fontSize: '12px', mr: 1 }}>Subject:</Box>
                                    <Box component="span" sx={{ fontWeight: 400, fontSize: '12px' }}>Subject 1</Box>
                                </Typography>
                                <Box sx={{ display: 'flex', maxWidth: '500px', alignItems: 'flex-start', }}>
                                    <Box sx={{ fontWeight: 600, fontSize: '12px', minWidth: '80px' }}>
                                        Case Note:
                                    </Box>
                                    <Typography sx={{ fontWeight: 400, fontSize: '12px' }}>
                                        Lorem ipsum doller sit amet consertd. Sapiune auhetv massa phastdnd ut insgdds.
                                    </Typography>
                                </Box>
                            </Grid>

                            <Grid item xs={6} sx={{ '& > *:not(:last-child)': { mb: '18px' } }}>
                                <Typography>
                                    <Box component="span" sx={{ fontWeight: 600, fontSize: '12px', mr: 1 }}>Total hours:</Box>
                                    <Box component="span" sx={{ fontWeight: 400, fontSize: '12px', backgroundColor: '#E0F4FF', color: '#26C6F9', borderRadius: 3, p: 0.5, px: 1 }}>
                                        2 hr
                                    </Box>
                                </Typography>
                                <Typography>
                                    <Box component="span" sx={{ fontWeight: 600, fontSize: '12px', mr: 1 }}>Attachments:</Box>
                                    <Box component="span" sx={{ fontWeight: 400, fontSize: '12px' }}>1 File</Box>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Card>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 2 }}>
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
                                fontSize: '12px',
                            }}
                        >
                            CLOSE
                        </Button>
                    </Box>
                </Grid>

                {/* Right Column if needed */}
                <Grid item xs={12} md={6}>
                    {/* Optional second column content */}
                </Grid>
            </Grid>


            <OptionsPopover open={open} anchorEl={anchorEl} onClose={handleClose} />
        </>
    )
}

export default AboutCaseNote;