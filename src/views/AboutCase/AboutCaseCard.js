import React from 'react';
import { Card, Typography, Box, Grid, Chip, Link } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import StatusChip from './StatusChip';
import moment from 'moment';
import SectionSkeleton from 'ui-component/Loader/SectionSkeleton';
import { useEffect, useState } from 'react';

const AboutCaseCard = ({ sessionData, caseId }) => {
  const opened = moment(sessionData?.caseOpened);
  const closed = moment(sessionData?.caseClosed);
  const durationInHours = closed.diff(opened, 'hours', true);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (sessionData) {
      setLoading(false);
    }
  }, [sessionData]);
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 2,
        boxShadow: 0,
        backgroundColor: '#fff',
        p: 3,
        // height: 228,
        overflowY: 'auto',
        maxWidth: 574
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
        <DescriptionOutlinedIcon />
        ABOUT CASE
      </Typography>

      <Box borderBottom={1} borderColor="grey.300" mb={2} />
      {loading ? (
        <SectionSkeleton lines={1} variant="rectangular" height={150} spacing={1} />
      ) : (
        <Grid container spacing={2}>
          {/* Left Column */}
          <Grid
            item
            xs={6}
            sx={{
              '& > *:not(:last-child)': {
                marginBottom: '18px'
              }
            }}
          >
            <Typography>
              <Box component="span" sx={{ fontWeight: '600', fontSize: '12px', lineHeight: '24px', marginRight: '8px' }}>
                Case ID :
              </Box>
              <Box component="span" sx={{ fontWeight: '400', fontSize: '12px', lineHeight: '24px', color: '#009FC7' }}>
                {sessionData?.uniqueId || '-'}
              </Box>
            </Typography>

            <Typography>
              <Box component="span" sx={{ fontWeight: '600', fontSize: '12px', lineHeight: '24px', marginRight: '8px' }}>
                Service User :
              </Box>{' '}
              <Box component="span" sx={{ fontWeight: '400', fontSize: '12px', lineHeight: '24px' }}>
                {sessionData?.userServiceDetails?.personalInfo?.firstName + ' ' + sessionData?.userServiceDetails?.personalInfo?.lastName ||
                  '-'}
              </Box>
            </Typography>

            <Typography>
              <Box component="span" sx={{ fontWeight: '600', fontSize: '12px', lineHeight: '24px', marginRight: '8px' }}>
                Case Owner :
              </Box>{' '}
              <Box component="span" sx={{ fontWeight: '400', fontSize: '12px', lineHeight: '24px' }}>
                {sessionData?.caseOwnerDetails?.[0]?.name }
                
              </Box>
            </Typography>

            <Typography>
              <Box component="span" sx={{ fontWeight: '600', fontSize: '12px', lineHeight: '24px', marginRight: '8px' }}>
                Date Opened :
              </Box>{' '}
              <Box component="span" sx={{ fontWeight: '400', fontSize: '12px', lineHeight: '24px' }}>
                {sessionData?.caseOpened ? moment(sessionData.caseOpened).format('DD/MM/YYYY') : '-'}
              </Box>
            </Typography>
          </Grid>
          {/* Right Column */}
          <Grid
            item
            xs={6}
            sx={{
              '& > *:not(:last-child)': {
                marginBottom: '18px'
              }
            }}
          >
            <Typography>
              <Box component="span" sx={{ fontWeight: '600', fontSize: '12px', lineHeight: '24px', marginRight: '8px' }}>
                Total hours :
              </Box>{' '}
              <Box
                component="span"
                sx={{
                  fontWeight: '400',
                  fontSize: '12px',
                  lineHeight: '24px',
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
              <Box component="span" sx={{ fontWeight: '600', fontSize: '12px', lineHeight: '24px', marginRight: '8px' }}>
                Case Status :
              </Box>
              <StatusChip status={sessionData?.status.charAt(0).toUpperCase() + sessionData?.status.slice(1).toLowerCase()} />
            </Typography>

            <Typography>
              <Box component="span" sx={{ fontWeight: '600', fontSize: '12px', lineHeight: '24px', marginRight: '8px' }}>
                Attachments :
              </Box>{' '}
              <Box component="span" sx={{ fontWeight: '400', fontSize: '12px', lineHeight: '24px' }}>
                1 File
              </Box>
            </Typography>

            <Typography>
              <Box component="span" sx={{ fontWeight: '600', fontSize: '12px', lineHeight: '24px', marginRight: '8px' }}>
                Date Closed :
              </Box>{' '}
              <Box component="span" sx={{ fontWeight: '400', fontSize: '12px', lineHeight: '24px' }}>
                {sessionData?.caseClosed ? moment(sessionData.caseClosed).format('DD/MM/YYYY') : '-'}
              </Box>
            </Typography>
          </Grid>
        </Grid>
      )}
    </Card>
  );
};

export default AboutCaseCard;
