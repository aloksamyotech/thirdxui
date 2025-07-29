import React from 'react';
import {
  Dialog,
  DialogContent,
  Typography,
  Grid,
  Paper,
  Box
} from '@mui/material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import NaturePeopleOutlinedIcon from '@mui/icons-material/NaturePeopleOutlined';
import { useNavigate } from 'react-router-dom';
import { DescriptionOutlined } from '@mui/icons-material';

const listOptions = [
  { label: 'Service User', icon: <PersonOutlineOutlinedIcon />, route: '/add-list',state: { type: 'service_user' }  },
  { label: 'Volunteer', icon: <VolunteerActivismOutlinedIcon />, route: '/add-list',state: { type: 'volunteer' }  },
  { label: 'Services', icon: <SettingsIcon />, route: '/add-list',state: { type: 'services' }  },
  { label: 'Case', icon: <ContentPasteOutlinedIcon />, route: '/add-list',state: { type: 'case' }  },
  { label: 'Mailing List', icon: <MailOutlineIcon />, route: '/add-list',state: { type: 'Mailing List' }  },
  { label: 'Donations', icon: <FavoriteBorderOutlinedIcon />, route: '/add-list',state: { type: 'donations' }  },
  { label: 'Donors', icon: <NaturePeopleOutlinedIcon />, route: '/add-list',state: { type: 'donor' }  },
  { label: 'Forms', icon: <DescriptionOutlined />, route: '/add-list',state: { type: 'Forms' }  }
];

const ListTypeDialog = ({ open, onClose }) => {
  const navigate = useNavigate();

 const handleSelect = (route, state) => {
    onClose();
    navigate(route, { state });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent sx={{ textAlign: 'center', p: 4 }}>
        <Typography variant="h6" mb={4}>
          Choose the type list you would like to create;
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {listOptions?.map((item, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <Paper
                onClick={() => handleSelect(item.route, item.state)}
                sx={{
                  p: 2,
                  textAlign: 'center',
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: 'grey.400',
                  borderRadius: 2,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box sx={{ color: 'black', mb: 1 }}>{item.icon}</Box>
                <Typography variant="body2">{item.label}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ListTypeDialog;
