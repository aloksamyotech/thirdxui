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
  const [serviceTypeName, setServiceTypeName] = useState('');
  const [sessionData, setSessionData] = useState(null);
  const [groupedTags, setGroupedTags] = useState([]);

  const [loading, setLoading] = useState(true);

  const session = location.state?.session;
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  
  const caseId = location.state?.caseData?.row?._id || location.state?.caseData?.row || location.state?.caseData?._id;
  
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      if (!caseId) return;
      try {
        const res = await getApi(urls.case.getById.replace(':id', caseId));
        
        setSessionData(res?.data?.caseData || {});
      } catch (error) {
        console.error('Failed to fetch service details', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [caseId]);


  useEffect(() => {
    const fetchServiceTypeName = async () => {
      try {
        const response = await getApi(urls.configuration.fetch);
        const configList = response?.data?.allConfiguration || [];
        const serviceTypeConfigs = configList.filter((item) => item.configurationType === 'Service Types');
        const matched = serviceTypeConfigs.find((item) => item._id === sessionData?.serviceType || item._id?.$oid === serviceType);

        if (matched) {
          setServiceTypeName(matched.name);
        } else {
          setServiceTypeName('Unknown');
        }
      } catch (error) {
        console.error('Error fetching configuration:', error);
        setServiceTypeName('Unknown');
      }
    };
    if (sessionData?.serviceType) {
      fetchServiceTypeName();
    }
  }, [sessionData?.serviceType]);

  useEffect(() => {
    const fetchAndGroupTags = async () => {
      try {
        const session = sessionData;
        if (!session) {
          console.warn('❌ No session data found');
          return;
        }



        const allTagsResponse = await getApi(urls.tag.getAllTags);
        const allTags = allTagsResponse?.data?.allTags || [];

        

        const allIds = [
          ...session.benificiary,
          ...session.campaigns,
          ...session.eventAttanded,
          ...session.engagement,
          ...session.fundingInterest,
          ...session.fundraisingActivities
        ].map((id) => (typeof id === 'object' ? id.$oid : id));

        

        const relatedTags = allTags.filter((tag) => {
          const tagId = typeof tag._id === 'object' ? tag._id.$oid : tag._id;
          const match = allIds.includes(tagId);
          if (match) {
            console.log(`✅ Match found for tag: ${tag.name} (${tagId})`);
          }
          return match;
        });

        
        const grouped = {};
        relatedTags.forEach((tag) => {
          const category = tag.tagCategoryName || 'Uncategorized';
          if (!grouped[category]) grouped[category] = [];
          grouped[category].push(tag.name);
        });

        const formatted = Object.entries(grouped).map(([category, tags]) => ({
          category,
          tags
        }));


        setGroupedTags(formatted);
      } catch (err) {
        console.error('❌ Error fetching tags:', err);
      }
    };

    if (sessionData) {
      fetchAndGroupTags();
    } else {
      console.warn('⚠️ No sessionData available to trigger fetch');
    }
  }, [sessionData]);

  

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

      <Grid container sx={{ p: 1 }}>
        <Grid item xs={12} md={6}>
          <AboutCaseCard sessionData={sessionData} caseId={caseId} />
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <CaseTagCard groupedTags={groupedTags} sessionData={sessionData} caseId={caseId} />

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
      </Grid>

      <OptionsPopover open={open} anchorEl={anchorEl} onClose={handleClose} />
    </>
  );
};

export default AboutCase;
