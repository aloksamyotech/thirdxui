import React from 'react';
import {
    Dialog,
    DialogContent,
    Typography,
    Grid,
    Paper
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import SpaIcon from '@mui/icons-material/Spa';
import { useNavigate } from 'react-router';

const ChooseTypeDialog = ({ open, onClose }) => {
    const navigate = useNavigate();

    const handleSelect = (type) => {
        onClose();
        if (type === 'ServiceUser') {
            navigate('/add-mail', { state: { subRole: 'service_user' } });
        } else if (type === 'Volunteer') {
            navigate('/add-mail', { state: { subRole: 'volunteer' } });
        } else if (type === 'Donor') {
            navigate('/add-mail', { state: { subRole: 'donor' } });
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogContent sx={{ textAlign: 'center', py: 4 }}>
                <Typography sx={{ mb: 4, fontSize:'16px', fontWeight:600, lineHeight:'21px' }}>
                    Choose the type list you would like to create.
                </Typography>

                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={4}>
                        <Paper
                            onClick={() => handleSelect('ServiceUser')}
                            sx={{
                                px: 1,
                                py:3,
                                borderRadius: 3,
                                textAlign: 'center',
                                cursor: 'pointer',
                                border:'1px solid #2727271F'
                            }}
                        >
                            <PersonIcon fontSize="large" />
                            <Typography mt={1}>Service User</Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={4}>
                        <Paper
                            onClick={() => handleSelect('Volunteer')}
                            sx={{
                                px: 1,
                                py:3,
                                borderRadius: 3,
                                textAlign: 'center',
                                cursor: 'pointer',
                                border:'1px solid #2727271F'
                            }}
                        >
                            <VolunteerActivismIcon fontSize="large" />
                            <Typography mt={1}>Volunteer</Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={4}>
                        <Paper
                            onClick={() => handleSelect('Donor')}
                            sx={{
                                px: 1,
                                py:3,
                                borderRadius: 3,
                                textAlign: 'center',
                                cursor: 'pointer',
                                border:'1px solid #2727271F'
                            }}
                        >
                            <SpaIcon fontSize="large" />
                            <Typography mt={1}>Donors</Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default ChooseTypeDialog;