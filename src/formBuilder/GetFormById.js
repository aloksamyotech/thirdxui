import { Button, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { getApi, postApi } from 'common/apiClient';
import { urls } from 'common/urls'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { useParams } from 'react-router';
import { Formik, useFormik } from "formik";
import DescriptionIcon from '@mui/icons-material/Description';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const GetFormById = () => {

  const { formid } = useParams();
  const [res, setRes] = useState(null)
  const [initialValues, setInitialValues] = useState({});
  const [validationSchema, setValidationSchema] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const getForm = async () => {
    const formUrl = `${urls?.forms?.add}/${formid}`
    const response = await getApi(formUrl)
    setRes(response?.data)
    const values = {};
    const validations = {};
    response?.data?.fields?.forEach(field => {
      values[field.label] = '';
      if (field.required) {
        if (field.validation === 'isEmail') {
          validations[field.label] = Yup.string().required('This is a required field').email('Please enter a valid Email Address.');
        }
        if (field.validation === 'isNumber') {
          validations[field.label] = Yup.string().required('This is a required field').matches(/^[0-9]/, 'Please enter a valid Phone Number.')
        }
        if (field.validation === '') {
          validations[field.label] = Yup.string().required('This is a required field');
        }
      }
    });
    setInitialValues(values);
    setValidationSchema(Yup.object(validations));
  }
  useEffect(() => {
    getForm()
  }, [])

  // const validationSchema = Yup.object({
  //   Name: Yup.string().required('This is a required field.'),
  //   Email: Yup.string().required('This is a required field.'),
  // });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const formUrl = `${urls?.responses?.submit}/${formid}`
      await postApi(formUrl, values)
      formik.resetForm();
      setSubmitted(true)
      toast.success('Form Submitted Successfully')
      // window.location.reload()
    }
  })

  const generateForm = (fields) => {

    return fields?.fields?.map((field) => {
      let fieldHTML = null;

      switch (field?.type) {
        case "textarea":
          fieldHTML = (
            <Box sx={{
              bgcolor: '#fff',
              p: '20px',
              borderRadius: '10px'
            }}>
              <FormControl sx={{
                minWidth: { xs: '100%', sm: '50%' }
              }}>
                <FormLabel>
                  {field?.label}
                  {field?.required &&
                    <span style={{ color: 'red' }}> *</span>}
                </FormLabel>
                <TextField
                  variant='outlined'
                  multiline
                  rows={3}
                  placeholder={field?.placeholder}
                  name={field?.label}
                  value={formik?.values[field?.label]}
                  onChange={formik?.handleChange}
                />
                <FormHelperText sx={{ color: '#d93227' }}>{formik.errors[field.label]}</FormHelperText>
              </FormControl>
            </Box>
          );
          break;

        case "select":
          fieldHTML = (
            <Box sx={{
              bgcolor: '#fff',
              padding: '20px',
              borderRadius: '10px'
            }}>
              <FormControl sx={{ minWidth: 250 }}>
                <FormLabel htmlFor={field?.name}>
                  {field?.label}
                  {field?.required &&
                    <span style={{ color: 'red' }}> *</span>}
                </FormLabel>
                <Select
                  name={field?.label}
                  value={formik?.values[field?.label]}
                  onChange={formik?.handleChange}
                  size='small'
                >
                  <MenuItem value=''><em> Please Select </em></MenuItem>
                  {
                    field?.values && field?.values?.map((option, index) => (
                      <MenuItem key={index} value={option?.value}>{option?.label}</MenuItem>))
                  }
                </Select>
                <FormHelperText sx={{ color: '#d93227' }}>{formik.errors[field.label]}</FormHelperText>
              </FormControl>
            </Box>
          );
          break;

        case "radio-group":
          fieldHTML = (
            <Box sx={{
              bgcolor: '#fff',
              padding: '20px',
              borderRadius: '10px'
            }}>
              <FormControl>
                <FormLabel>
                  {field?.label}
                  {field?.required &&
                    <span style={{ color: 'red' }}> *</span>}
                </FormLabel>
                <RadioGroup
                  // row
                  name={field?.label}
                  value={formik?.values[field?.label]}
                  onChange={formik?.handleChange}
                >{
                    field?.values &&
                    field?.values?.map((checkbox, index) => (
                      <FormControlLabel
                        key={index}
                        control={<Radio />}
                        label={checkbox?.label}
                        value={checkbox?.label} />
                    ))}
                </RadioGroup>
                <FormHelperText sx={{ color: '#d93227' }}>{formik.errors[field.label]}</FormHelperText>
              </FormControl>
            </Box>
          );
          break;

        case "number":
          fieldHTML = (
            <Box sx={{
              bgcolor: '#fff',
              p: '20px',
              borderRadius: '10px'
            }}>
              <FormControl sx={{ minWidth: '50%' }}>
                <FormLabel>
                  {field?.label}
                  {field?.required &&
                    <span style={{ color: 'red' }}> *</span>}
                </FormLabel>
                <TextField
                  variant='standard'
                  type='number'
                  placeholder={field?.placeholder}
                  name={field?.label}
                  value={formik?.values[field?.label]}
                  onChange={formik?.handleChange} />
                <FormHelperText sx={{ color: '#d93227' }}>{formik.errors[field.label]}</FormHelperText>
              </FormControl>
            </Box>
          );
          break;

        case "file":
          fieldHTML = (
            <Box sx={{
              bgcolor: '#fff',
              p: '20px',
              borderRadius: '10px'
            }}>
              <FormControl sx={{ minWidth: '50%' }}>
                <FormLabel>
                  {field?.label}
                  {field?.required &&
                    <span style={{ color: 'red' }}> *</span>}
                </FormLabel>
                <TextField
                  variant='standard'
                  type='file'
                  placeholder={field?.placeholder}
                  name={field?.label}
                  value={formik?.values[field?.label]}
                  onChange={formik?.handleChange} />
                <FormHelperText sx={{ color: '#d93227' }}>{formik.errors[field.label]}</FormHelperText>
              </FormControl>
            </Box>
          );
          break;

        case "date":
          fieldHTML = (
            <Box sx={{
              bgcolor: '#fff',
              p: '20px',
              borderRadius: '10px'
            }}>
              <FormControl sx={{ minWidth: '50%' }}>
                <FormLabel>
                  {field?.label}
                  {field?.required &&
                    <span style={{ color: 'red' }}> *</span>}
                </FormLabel>
                <TextField
                  variant='standard'
                  type='date'
                  name={field?.label}
                  placeholder={field?.placeholder}
                  value={formik?.values[field?.label]}
                  onChange={formik?.handleChange} />
                <FormHelperText sx={{ color: '#d93227' }}>{formik.errors[field.label]}</FormHelperText>
              </FormControl>
            </Box>
          );
          break;

        case "checkbox-group":
          fieldHTML = (
            <FormControl fullWidth sx={{
              bgcolor: '#fff',
              p: '20px',
              borderRadius: '10px'
            }}>
              <FormLabel>
                {field?.label}
                {field?.required &&
                  <span style={{ color: 'red' }}> *</span>}
              </FormLabel>
              <FormGroup>
                {field?.values &&
                  field.values.map((checkbox, index) => (
                    <FormControlLabel
                      key={index}
                      label={checkbox.label}
                      control={
                        <Checkbox
                          name={field.label}
                          value={checkbox.label}
                          onChange={formik.handleChange}
                        />
                      }
                    />
                  ))}
              </FormGroup>
              <FormHelperText sx={{ color: '#d93227' }}>{formik.errors[field.label]}</FormHelperText>
            </FormControl>
          );
          break;

        case "button":
          fieldHTML = (
            <div className="" style={{
              display: 'flex',
              justifyContent: 'center'
            }}>
              <button className={field?.className} name={field.name} style={{
                background: '#1e88e5',
                height: '40px',
                width: '100px',
                borderRadius: '10px',
                color: '#fff',
                border: 'none'
              }}>
                {field?.label}
              </button>
            </div>
          );
          break;

        case "text":
          fieldHTML = (
            <Box sx={{
              bgcolor: '#fff',
              p: '20px',
              borderRadius: '10px'
            }}>
              <FormControl sx={{ minWidth: { xs: '100%', sm: '50%' } }}>
                <FormLabel>
                  {field?.label}
                  {field?.required &&
                    <span style={{ color: '#d93227' }}> *</span>}
                </FormLabel>
                <TextField
                  variant='standard'
                  name={field?.label}
                  placeholder={field?.placeholder}
                  value={formik?.values[field?.label]}
                  onChange={formik?.handleChange}
                />
                <FormHelperText sx={{ color: '#d93227' }}>{formik.errors[field.label]}</FormHelperText>
              </FormControl>
            </Box >
          );
          break;

        case "paragraph":
          fieldHTML = (
            <Box sx={{
              bgcolor: '#fff',
              padding: '20px',
              borderRadius: '10px'
            }}>
              <Typography className={field?.className} style={{ fontSize: '10px' }}>{field?.label}</Typography>
            </Box>
          );
          break;

        case "header":
          fieldHTML = (
            <Box sx={{
              bgcolor: '#fff',
              p: '20px',
              borderRadius: '10px',
              borderTop: '10px solid #673ab7'
            }}>
              <Typography variant='h2' sx={{ fontSize: { xs: '20px', sm: '30px' } }}>{field?.label}</Typography>
            </Box>
          );
          break;

        default:
          break;
      }

      return fieldHTML;
    });
  };

  return (<>
    <div style={{
      backgroundColor: '#f0ebf8',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <h1
        style={{
          color: '#000',
          margin: 0,
          padding: '20px',
          fontSize: '20px',
          display: 'flex',
          gap: 1,
          alignItems: 'center',
          background: '#fff'
        }}>
        <DescriptionIcon sx={{
          color: '#673ab7'
        }} /> ThirdEx Survey Form</h1>

      {
        res && !submitted &&
        <Box
          sx={{
            flexGrow: 1,
            paddingTop: '50px',
            width: { xs: '90%', md: '70%' },
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}

        >
          {generateForm(res)}
          <Divider sx={{ mt: '10px' }} />
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, p: '20px' }}>
            <Button variant='contained' onClick={formik.handleSubmit}>Submit</Button>
            <Button variant='outlined' onClick={formik.resetForm}>Clear</Button>
          </Box>
        </Box>
      }
      {
        !res &&
        <div style={{ height: '90vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p>Form Not Found</p>
        </div>
      }
      {
        submitted &&
        <div style={{ height: '90vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <p style={{ fontSize: '20px' }}>🎉 Thank You!</p>
          <p>Your response has been submitted successfully.</p>
        </div>
      }
      <div style={{
        backgroundColor: '#ffffff',
        padding: '12px 32px',
        borderTop: '1px solid #ddd',
        textAlign: 'center',
        fontSize: '14px',
        color: '#666'
      }}>
        © 2025 Samyotech App
      </div>
    </div>

  </>
  )
}

export default GetFormById