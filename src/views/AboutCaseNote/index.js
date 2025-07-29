import { Box, Button, Card, Grid, IconButton, Stack, Typography } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import React from 'react';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import { useLocation, useNavigate } from 'react-router';
import { useState } from 'react';
import { urls } from 'common/urls';
import { useEffect } from 'react';
import { getApi } from 'common/apiClient';
import moment from 'moment';
import CasePopover from 'components/CasePopover';
import SectionSkeleton from 'ui-component/Loader/SectionSkeleton';

const AboutCaseNote = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const caseData = location.state?.caseData;

  const [caseNoteData, setCaseNoteData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);
  useEffect(() => {
    const fetchCaseNotes = async () => {
      try {
        const res = await getApi(urls.casenote.getById.replace(':id', caseData?.id));

        setCaseNoteData(res?.data?.caseNoteData || {});
      } catch (error) {
        console.error('Failed to fetch service details', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseNotes();
  }, [caseData?.id]);
  const opened = moment(caseNoteData?.caseId?.caseOpened);
  const closed = moment(caseNoteData?.caseId?.caseClosed);
  const durationInHours = closed.diff(opened, 'hours', true);

  return (
    <>
      <Grid item xs={12} mb={2}>
        <Stack direction="row" alignItems="center">
          <Typography fontWeight="600" fontSize="16px" display="flex" alignItems="center">
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
              flexGrow: 1
            }}
          >
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              gutterBottom
            >
              <BusinessCenterOutlinedIcon />
              ABOUT CASE NOTE
            </Typography>

            <Box borderBottom={1} borderColor="grey.300" mb={2} mt={2} />
            {loading ? (
              <SectionSkeleton lines={1} variant="rectangular" height={150} spacing={1} />
            ) : (
              <Grid container spacing={2}>
                <Grid item xs={6} sx={{ '& > *:not(:last-child)': { mb: '18px' }, maxWidth: '522px' }}>
                  <Typography>
                    <Box component="span" sx={{ fontWeight: 600, fontSize: '12px', mr: 1 }}>
                      Date:
                    </Box>
                    <Box component="span" sx={{ fontWeight: 400, fontSize: '12px' }}>
                      {caseNoteData?.date ? moment(caseNoteData.caseOpened).format('DD/MM/YYYY') : '-'}
                    </Box>
                  </Typography>
                  <Typography>
                    <Box component="span" sx={{ fontWeight: 600, fontSize: '12px', mr: 1 }}>
                      Contact Type:
                    </Box>
                    <Box component="span" sx={{ fontWeight: 400, fontSize: '12px' }}>
                      {caseNoteData?.configurationId?.name || '-'}
                    </Box>
                  </Typography>
                  <Typography>
                    <Box component="span" sx={{ fontWeight: 600, fontSize: '12px', mr: 1 }}>
                      Subject:
                    </Box>
                    <Box component="span" sx={{ fontWeight: 400, fontSize: '12px' }}>
                      {caseNoteData?.subject || '-'}
                    </Box>
                  </Typography>
                  <Box sx={{ display: 'flex', maxWidth: '500px', alignItems: 'flex-start' }}>
                    <Box sx={{ fontWeight: 600, fontSize: '12px', minWidth: '80px' }}>Case Note:</Box>
                    <Typography sx={{ fontWeight: 400, fontSize: '12px' }}>{caseNoteData?.note || '-'}</Typography>
                  </Box>
                </Grid>

                <Grid item xs={6} sx={{ '& > *:not(:last-child)': { mb: '18px' } }}>
                  <Typography>
                    <Box component="span" sx={{ fontWeight: 600, fontSize: '12px', mr: 1 }}>
                      Total hours:
                    </Box>
                    <Box
                      component="span"
                      sx={{
                        fontWeight: 400,
                        fontSize: '12px',
                        backgroundColor: '#E0F4FF',
                        color: '#26C6F9',
                        borderRadius: 3,
                        p: 0.5,
                        px: 1
                      }}
                    >
                      {durationInHours.toFixed(2)} hr
                    </Box>
                  </Typography>
                  <Typography>
                    <Box component="span" sx={{ fontWeight: 600, fontSize: '12px', mr: 1 }}>
                      Attachments:
                    </Box>
                    <Box component="span" sx={{ fontWeight: 400, fontSize: '12px' }}>
                      {caseNoteData?.file ? `1 File` : 'No Attachments'}
                    </Box>
                  </Typography>
                </Grid>
              </Grid>
            )}
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
                  backgroundColor: '#009fc7'
                }
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

        <Grid item xs={12} md={6}></Grid>
      </Grid>

      <CasePopover open={open} anchorEl={anchorEl} onClose={handleClose} data={caseData} />
    </>
  );
};

export default AboutCaseNote;
