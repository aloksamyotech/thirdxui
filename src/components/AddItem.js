import React from 'react';
import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, Grid, Button, Box, IconButton, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import GiftAidDialog from './GiftAiddialog';
import Attendee from './AttendeeDialog';
import { useNavigate } from 'react-router';
import EmailInboundDialog from './InboundDialog';
import { ROLES } from 'common/constants';
import { getApi } from 'common/apiClient';
import { urls } from 'common/urls';
import { toast } from 'react-toastify';
import AddTaskDialog from './AddTaskDialog';

const AddItemDialog = ({ open, onClose, onSelect,fetchTimeLineData, userId, role }) => {
  const navigate = useNavigate();
  const [selectedForm, setSelectedForm] = useState(null);

  const handleClick = async (type) => {
    if (type === 'caseNote') {
      const res = await getApi(`${urls.case.getCaseServiceUser}${userId}`);
      if (res?.data) {
        navigate('/view-case', { state: { id: res?.data?._id } });
      } else {
        toast.error('No case found for user');
      }
    } else if (type === 'donation') {
      navigate('/financial');
    }
    setSelectedForm(type);
  };

  const allItems = [
    { label: 'Case Note', value: 'caseNote' },
    { label: 'Register Attendance', value: 'registerAttendance' },
    { label: 'Task', value: 'task' },
    { label: 'Add Donation', value: 'donation' },
    { label: 'Gift Aid Declarations', value: 'giftAidDeclarations' },
    { label: 'Request for Fundraising Pack', value: 'fundraisingPack' },
    { label: 'Email Inbound', value: 'emailInbound' },
    { label: 'Email Outbound', value: 'emailOutbound' },
    { label: 'Phone Call Inbound', value: 'phoneCallInbound' },
    { label: 'Phone Call Outbound', value: 'phoneCallOutbound' },
    { label: 'Letter Received', value: 'letterReceived' },
    { label: 'Letter Sent', value: 'letterSent' }
  ];
  let filteredItems = [];

  switch (role) {
    case ROLES.VOLUNTEER:
      filteredItems = allItems.filter((item) =>
        ['emailInbound', 'emailOutbound', 'phoneCallInbound', 'phoneCallOutbound', 'letterReceived', 'letterSent'].includes(item.value)
      );
      break;
    case ROLES.DONOR:
      filteredItems = allItems.filter((item) =>
        [
          'addDonation',
          'fundraisingPack',
          'task',
          'donation',
          'giftAidDeclarations',
          'emailInbound',
          'emailOutbound',
          'phoneCallInbound',
          'phoneCallOutbound',
          'letterReceived',
          'letterSent'
        ].includes(item.value)
      );
      break;
    case ROLES.SERVICE_USER:
      filteredItems = allItems.filter((item) =>
        [
          'caseNote',
          'registerAttendance',
          'task',
          'donation',
          'emailInbound',
          'emailOutbound',
          'phoneCallInbound',
          'phoneCallOutbound',
          'letterReceived',
          'letterSent'
        ].includes(item.value)
      );
      break;
    default:
      filteredItems = allItems;
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: 500, borderRadius: 2 }
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between" px={2} pt={2}>
        <DialogTitle sx={{ fontSize: '16px', fontWeight: '600', p: 0 }}>Add Item</DialogTitle>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>
      <Box p={2} pt={1}>
        {role === ROLES.SERVICE_USER && (
          <Button
            variant="outlined"
            fullWidth
            size="small"
            onClick={() => handleClick('giftAidDeclarations')}
            sx={{
              justifyContent: 'space-between',
              color: '#4B5563',
              backgroundColor: '#F9FAFC',
              border: '1px solid #E5E7EB',
              borderRadius: '12px',
              py: 1,
              px: 1,
              mb: 2,
              fontSize: '12px',
              textTransform: 'none',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              '&:hover': {
                borderColor: '#808191',
                backgroundColor: '#f0f1f5'
              }
            }}
            endIcon={<AddIcon sx={{ color: 'black', fontSize: '1rem' }} />}
          >
            Gift Aid Declarations
          </Button>
        )}
        {role === ROLES.VOLUNTEER && (
          <Button
            variant="outlined"
            fullWidth
            size="small"
            onClick={() => handleClick('task')}
            sx={{
              justifyContent: 'space-between',
              color: '#4B5563',
              backgroundColor: '#F9FAFC',
              border: '1px solid #E5E7EB',
              borderRadius: '12px',
              py: 1,
              px: 1,
              mb: 2,
              fontSize: '12px',
              textTransform: 'none',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              '&:hover': {
                borderColor: '#808191',
                backgroundColor: '#f0f1f5'
              }
            }}
            endIcon={<AddIcon sx={{ color: 'black', fontSize: '1rem' }} />}
          >
            Task
          </Button>
        )}
        <Grid container spacing={2}>
          {filteredItems.map((item) => (
            <Grid item xs={6} key={item.value}>
              <Button
                variant="outlined"
                fullWidth
                size="medium"
                onClick={() => handleClick(item.value)}
                sx={{
                  justifyContent: 'space-between',
                  color: '#4B5563',
                  backgroundColor: '#F9FAFC',
                  border: '1px solid #E5E7EB',
                  borderRadius: '12px',
                  py: 1,
                  px: 1,
                  fontSize: '12px',
                  textTransform: 'none',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  '&:hover': {
                    borderColor: '#808191',
                    backgroundColor: '#f0f1f5'
                  }
                }}
                endIcon={
                  <AddIcon
                    sx={{
                      color: '#0F172A',
                      fontSize: '1.1rem'
                    }}
                  />
                }
              >
                {item.label}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
      {selectedForm === 'giftAidDeclarations' && (
        <GiftAidDialog open={true} onClose={onClose} fetchTimeLineData={fetchTimeLineData} handleClose={() => setSelectedForm(null)} userId={userId} dateLabel={'Gift Aid Declarations'} />
      )}
      {selectedForm === 'registerAttendance' && <Attendee open={true} handleClose={() => setSelectedForm(null)} userId={userId} />}
      {selectedForm === 'emailInbound' && (
        <EmailInboundDialog
          open={true}
          handleClose={() => setSelectedForm(null)}
          userId={userId}
          fetchTimeLineData={fetchTimeLineData}
          onClose={onClose}
          type="inbound"
          dialogTitle="Email Inbound"
          dateLabel="Email Inbound"
        />
      )}
      {selectedForm === 'emailOutbound' && (
        <EmailInboundDialog
          open={true}
          handleClose={() => setSelectedForm(null)}
          userId={userId}
          onClose={onClose}
          fetchTimeLineData={fetchTimeLineData}
          type="outbound"
          dialogTitle="Email Outbound"
          dateLabel="Email Outbound"
        />
      )}
      {selectedForm === 'phoneCallInbound' && (
        <EmailInboundDialog
          open={true}
          handleClose={() => setSelectedForm(null)}
          userId={userId}
          fetchTimeLineData={fetchTimeLineData}
          onClose={onClose}
          type="phoneCallInbound"
          dialogTitle="Phone Call Inbound"
          dateLabel="Phone Call Inbound"
        />
      )}
      {selectedForm === 'phoneCallOutbound' && (
        <EmailInboundDialog
          open={true}
          handleClose={() => setSelectedForm(null)}
          userId={userId}
          fetchTimeLineData={fetchTimeLineData}
          onClose={onClose}
          type="phoneCallOutbound"
          dialogTitle="Phone Call Outbound"
          dateLabel="Phone Call Outbound"
        />
      )}
      {selectedForm === 'letterReceived' && (
        <EmailInboundDialog
          open={true}
          handleClose={() => setSelectedForm(null)}
          userId={userId}
          onClose={onClose}
          fetchTimeLineData={fetchTimeLineData}
          type="letterReceived"
          dialogTitle="Letter Received"
          dateLabel="Letter Received"
        />
      )}
      {selectedForm === 'letterSent' && (
        <EmailInboundDialog
          open={true}
          handleClose={() => setSelectedForm(null)}
          userId={userId}
          onClose={onClose}
          fetchTimeLineData={fetchTimeLineData}
          type="letterSent"
          dialogTitle="Letter Sent"
          dateLabel="Letter Sent"
        />
      )}
      {selectedForm === 'task' && (
        <AddTaskDialog
          open={true}
          handleClose={() => setSelectedForm(null)}
          userId={userId}
          onClose={onClose}
          fetchTimeLineData={fetchTimeLineData}
        />
      )}
    </Dialog>
  );
};

export default AddItemDialog;
