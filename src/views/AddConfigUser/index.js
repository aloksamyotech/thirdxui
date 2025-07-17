import React, { useEffect } from 'react';
import { Grid, TextField, Typography, Button, FormControlLabel, MenuItem, IconButton, Box, Paper, Tooltip, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HelpIcon from '@mui/icons-material/Help';

import { useNavigate, useLocation } from 'react-router-dom';
import AntSwitch from 'components/AntSwitch.js';
import { useForm, Controller } from 'react-hook-form';
import { postApi, updateApi } from 'common/apiClient';
import { urls } from 'common/urls';
import toast from 'react-hot-toast';
import { accountTypes, permissionsList } from 'common/constants';
const AddConfigUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location?.state;

  const { handleSubmit, control, reset, setValue, watch } = useForm({
    defaultValues: {
      name: '',
      email: '',
      accountType: '',
      permissions: permissionsList.reduce((acc, perm) => {
        acc[perm.key] = true;
        return acc;
      }, {})
    }
  });
  useEffect(() => {
    if (userData) {
      setValue('name', userData.name || '');
      setValue('email', userData.email || '');
      setValue('accountType', userData.accountType || '');

      if (userData.permissions) {
        Object.entries(userData.permissions).forEach(([key, value]) => {
          setValue(`permissions.${key}`, value);
        });
      }
    }
  }, [userData, setValue]);
  const accountType = watch('accountType');

  useEffect(() => {
    if (accountType === 'admin') {
      permissionsList.forEach((perm) => {
        setValue(`permissions.${perm.key}`, true);
      });
    }
  }, [accountType, setValue]);

  const onSubmit = async (data) => {
    try {
      let res;
      if (userData?._id) {
        res = await updateApi(`${urls.login.updateUserById}/${userData._id}`, data);

        if (res.success) {
          toast.success('User updated successfully');
          navigate('/users');
        }
      } else {
        res = await postApi(urls.login.createConfigUser, data);
        if (res.data?.errorCode === 'USER_EXISTS') {
          toast.error('Email Already Registered');
        } else if (res.success === true) {
          toast.success('Invite sent successfully');
          navigate('/users');
        }
      }

      reset();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Internal server error');
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography fontWeight="600" fontSize="16px" display="flex" alignItems="center" gap={1}>
          <IconButton onClick={() => navigate(-1)} size="small">
            <ArrowBackIcon />
          </IconButton>
          Send Invite To New User
        </Typography>
      </Box>

      <Paper elevation={1} sx={{ p: 3, borderRadius: 3, mt: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} sx={{ border: '1px solid #e0e0e0', borderRadius: 2, pb: 2, pr: 2 }}>
            <Grid item xs={12} md={4}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => <TextField {...field} label="Name" fullWidth variant="outlined" />}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => <TextField {...field} label="Email" fullWidth variant="outlined" />}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Controller
                name="accountType"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Account Type" fullWidth select>
                    {accountTypes.map((type) => (
                      <MenuItem key={type.value} value={type.value}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
          </Grid>

          <Typography mt={4} fontWeight="600">
            Permissions
          </Typography>
          <Divider sx={{ my: 1 }} />

          <Grid container spacing={2}>
            {permissionsList.map((perm) => (
              <Grid item xs={12} md={6} key={perm.key}>
                <FormControlLabel
                  control={
                    <Controller
                      name={`permissions.${perm.key}`}
                      control={control}
                      render={({ field }) => (
                        <AntSwitch
                          {...field}
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                          disabled={accountType === 'admin'}
                          sx={{ ml: 1 }}
                          color="primary"
                        />
                      )}
                    />
                  }
                  label={
                    <Box display="flex" alignItems="center">
                      <span>Allow access to {perm.label}</span>
                      <Tooltip title={`Access to ${perm.label} section`} placement="top">
                        <IconButton size="small" sx={{ ml: 1 }}>
                          <HelpIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  }
                  labelPlacement="start"
                />
              </Grid>
            ))}
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
            <Button
              variant="contained"
              sx={{
                background: '#053146',
                borderRadius: '8px',
                paddingInline: 4,
                '&:hover': {
                  backgroundColor: '#053146'
                }
              }}
              type="submit"
            >
              SEND INVITE
            </Button>
            <Button
              onClick={() => navigate(-1)}
              sx={{
                border: '1px solid #c5c5ff',
                borderRadius: '8px',
                color: '#5c5cff',
                textTransform: 'none',
                px: 4,
                py: 1,
                fontWeight: 600,
                backgroundColor: '#fff',
                '&:hover': {
                  backgroundColor: '#f8f8ff'
                }
              }}
            >
              CANCEL
            </Button>
          </Box>
        </form>
      </Paper>
    </>
  );
};

export default AddConfigUser;
