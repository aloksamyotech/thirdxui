// pages/AboutCase/index.jsx

import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Stack,
  Tooltip
} from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useLocation, useNavigate } from 'react-router-dom';
import { getApi, postApi } from 'common/apiClient';
import { urls } from 'common/urls';
import toast from 'react-hot-toast';
import AboutCaseCard from './AboutCaseCard';
import CaseTagCard from './CaseTagCard';
import OptionsPopoverForCase from 'components/OptionsPopoverForCase';
import { IconTrash, IconPencil } from '@tabler/icons';

const AboutCase = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [serviceTypeName, setServiceTypeName] = useState('');
  const [sessionData, setSessionData] = useState(null);
  const [groupedTags, setGroupedTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmArchiveOpen, setConfirmArchiveOpen] = useState(false);
  const [archiveReason, setArchiveReason] = useState('');

  const open = Boolean(anchorEl);
  const caseId = location.state?.caseData?.row?._id || location.state?.caseData?.row || location.state?.caseData?._id;

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
    const fetchAndGroupTags = async () => {
      try {
        if (!sessionData) return;
        const allTagsResponse = await getApi(urls.tag.getAllTags);
        const allTags = allTagsResponse?.data?.allTags || [];

        const allIds = [
          ...sessionData.benificiary,
          ...sessionData.campaigns,
          ...sessionData.eventAttanded,
          ...sessionData.engagement,
          ...sessionData.fundingInterest,
          ...sessionData.fundraisingActivities
        ].map((id) => (typeof id === 'object' ? id.$oid : id));

        const relatedTags = allTags.filter((tag) => {
          const tagId = typeof tag._id === 'object' ? tag._id.$oid : tag._id;
          return allIds.includes(tagId);
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
    }
  }, [sessionData]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionClick = (option) => {
    switch (option) {
      case 'Edit':
        navigate(`/add-case`, { state: { sessionData } });
        break;
      case 'Archive':
        setConfirmArchiveOpen(true);
        break;
      case 'Delete':
        setConfirmOpen(true);
        break;
      default:
        break;
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await postApi(`${urls.case.delete}${caseId}`);
      toast.success('Case deleted successfully');
      navigate(-1);
    } catch (err) {
      toast.error('Failed to delete case');
    } finally {
      setConfirmOpen(false);
    }
  };

  const handleConfirmArchive = async () => {
    try {
      if (!archiveReason) {
        toast.error('Please select a reason');
        return;
      }

      await postApi(urls.case.toggleArchive.replace(':id', caseId), 'PATCH', {
        reason: archiveReason
      });

      toast.success('Case archived');
      setConfirmArchiveOpen(false);
    } catch (err) {
      toast.error('Failed to archive case');
    }
  };

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

      <Grid container sx={{ p: 1 }} spacing={2}>
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

      <OptionsPopoverForCase open={open} anchorEl={anchorEl} onClose={handleClose} onOptionClick={handleOptionClick} />

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)} PaperProps={{ sx: { width: 400, borderRadius: 5 } }}>
        <Box sx={{ textAlign: 'center', pt: 3 }}>
          <IconButton disableRipple sx={{ backgroundColor: '#FFE8E6', color: '#FF5C5C', pointerEvents: 'none' }}>
            <IconTrash fontSize="small" />
          </IconButton>
        </Box>
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 600, fontSize: 20, color: '#053046' }}>Are you sure?</DialogTitle>
        <DialogContent>
          <Typography align="center" sx={{ fontSize: 14, color: '#0a344a', mb: '-9px' }}>
            You want to delete this profile. This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button
            onClick={() => setConfirmOpen(false)}
            variant="outlined"
            sx={{
              color: '#FF5C5C',
              borderColor: '#FF5C5C',
              textTransform: 'uppercase',
              fontWeight: 480,
              width: 120
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            sx={{
              backgroundColor: '#053046',
              color: '#efeceb',
              textTransform: 'uppercase',
              fontWeight: 380,
              width: 120
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={confirmArchiveOpen}
        onClose={() => setConfirmArchiveOpen(false)}
        PaperProps={{ sx: { borderRadius: 3, p: 2, width: 400 } }}
      >
        <DialogTitle sx={{ fontWeight: 600, pb: 1 }}>Archive Reason</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FormControl size="small" fullWidth>
              <InputLabel>Reason</InputLabel>
              <Select
                value={archiveReason}
                onChange={(e) => setArchiveReason(e.target.value)}
                label="Reason"
                sx={{ backgroundColor: '#f4f2ff', borderRadius: 1 }}
              >
                <MenuItem value="Deceased">Deceased</MenuItem>
                <MenuItem value="Gone away">Gone away</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              onClick={handleConfirmArchive}
              sx={{
                backgroundColor: '#6366f1',
                textTransform: 'uppercase',
                fontWeight: 500,
                px: 3,
                height: 40,
                whiteSpace: 'nowrap',
                minWidth: 100,
                '&:hover': {
                  backgroundColor: '#4f46e5'
                }
              }}
            >
              Archive
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AboutCase;
