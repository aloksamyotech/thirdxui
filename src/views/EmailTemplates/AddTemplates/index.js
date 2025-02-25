/* eslint-disable arrow-body-style */
import { Box, Button, Container, FormLabel, Grid, Stack, TextField } from '@mui/material';
import React, { useRef, useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
import { EmailEditor } from 'react-email-editor';
//import { toast } from 'react-toastify';
// import { apipost } from '../../service/api';
import Header from '../../../ui-component/Header';

const AddEmailTemplates = () => {
  const emailEditorRef = useRef(null);
  const [preview, setPreview] = useState(false);
  const [name, setName] = useState('');
  const navigate = useNavigate();
  //   const userid = localStorage.getItem('user_id');

  const togglePreview = () => {
    if (preview) {
      emailEditorRef.current?.editor?.hidePreview();
      setPreview(false);
    } else {
      emailEditorRef.current?.editor?.showPreview('desktop');
      setPreview(true);
    }
  };

  // const saveDesign = () => {
  //   if (name !== '') {
  //     emailEditorRef.current?.exportHtml(async (allData) => {
  //       const { html } = allData;
  //       const { design } = allData;

  //       const data = {
  //         html,
  //         design,
  //         name
  //        createdBy: userid
  //       };
  //       // const result = await apipost('emailtemplate/add', data);
  //       // if (result && result.status === 201) {
  //       //   toast.success(result.data.message);
  //       //   setName('');
  //       // }
  //       navigate('/dashboard/emailtemplate');
  //     });
  //   } else {
  //     toast.error('Template Name is required');
  //   }
  // };

  const back = () => {
    navigate('/dashboard/emailtemplate');
  };

  return (
    <div>
      <Container>
        <Grid container display="flex" alignItems="center">
          <Grid container display="flex" alignItems="center">
            <Stack direction="row" alignItems="center" mb={3} justifyContent={'space-between'} width={'100%'}>
              <Header title="Create Template" />
              <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
                <Button variant="contained" color="primary" onClick={togglePreview}>
                  {preview ? 'Hide Preview' : 'Show Preview'}
                </Button>
                <Button variant="contained" color="primary">
                  Save
                </Button>
                <Button variant="contained" color="primary" startIcon={<ArrowBackIosIcon />} onClick={back}>
                  Back
                </Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
        <FormLabel>Template Name</FormLabel>
        <TextField name="policyStartDate" type="" size="small" fullWidth required value={name} onChange={(e) => setName(e.target.value)} />
        <Box bgcolor={'gray'} className="editerHeight" mt={3}>
          <EmailEditor ref={emailEditorRef} />
        </Box>
      </Container>
    </div>
  );
};

export default AddEmailTemplates;
