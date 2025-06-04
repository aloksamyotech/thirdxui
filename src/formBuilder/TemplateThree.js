import React from 'react'
import { Formik, useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';

const TemplateThree = ({ formData, setPreview, setSelectedTemplate }) => {

    const navigate = useNavigate()

    const initialValues = {}
    const validationSchema = {}
    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
     formik.resetForm();
            window.location.reload()
        }
    })

    const generateForm = (fields) => {
        return fields?.map((field) => {
            let fieldHTML = null;

            switch (field?.type) {
                case "textarea":
                    fieldHTML = (
                        <Box sx={{ bgcolor: '#E9DFC3', p: '20px', borderRadius: '1px' }}>
                            <FormControl sx={{ minWidth: '50%' }}>
                                <FormLabel sx={{ color: '#000' }}>{field?.label}</FormLabel>
                                <TextField
                                    variant='outlined'
                                    multiline
                                    rows={3}
                                    placeholder={field?.placeholder}
                                    name={field?.name}
                                    value={formik?.values[field?.name]}
                                    onChange={formik?.handleChange} />
                            </FormControl>
                        </Box>
                    );
                    break;

                case "select":
                    fieldHTML = (
                        <Box sx={{ bgcolor: '#E9DFC3', padding: '20px', borderRadius: '1px' }}>
                            <FormControl sx={{ minWidth: 250 }}>
                                <FormLabel htmlFor={field?.name} sx={{ color: '#000' }}>{field?.label}</FormLabel>
                                <Select
                                    name={field?.name}
                                    value={formik?.values[field?.name]}
                                    onChange={formik?.handleChange}
                                    size='small'
                                >
                                    <MenuItem value=''><em> Please Select </em></MenuItem>
                                    {field?.values && field?.values?.map((option, index) => (
                                        <MenuItem key={index} value={option?.value}>{option?.label}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    );
                    break;

                case "radio-group":
                    fieldHTML = (
                        <Box sx={{ bgcolor: '#E9DFC3', padding: '20px', borderRadius: '1px' }}>
                            <FormControl>
                                <FormLabel sx={{ color: '#000' }}>{field?.label}</FormLabel>
                                <RadioGroup
                                    row
                                    name={field?.name}
                                    value={formik?.values[field?.name]}
                                    onChange={formik?.handleChange}
                                >{field?.values && field?.values?.map((checkbox, index) => (
                                    <FormControlLabel key={index} control={<Radio />} label={checkbox?.label} value={checkbox?.label} />
                                ))}
                                </RadioGroup>
                            </FormControl>
                        </Box>
                    );
                    break;

                case "number":
                    fieldHTML = (
                        <Box sx={{ bgcolor: '#E9DFC3', p: '20px', borderRadius: '1px' }}>
                            <FormControl sx={{ minWidth: '50%', color: '#000  ' }}>
                                <FormLabel>{field?.label}</FormLabel>
                                <TextField
                                    variant='standard'
                                    type='number'
                                    placeholder={field?.placeholder}
                                    name={field?.name}
                                    value={formik?.values[field?.name]}
                                    onChange={formik?.handleChange} />
                            </FormControl>
                        </Box>
                    );
                    break;

                case "file":
                    fieldHTML = (
                        <Box sx={{ bgcolor: '#E9DFC3', p: '20px', borderRadius: '1px' }}>
                            <FormControl sx={{ minWidth: '50%' }}>
                                <FormLabel sx={{ color: '#000' }}>{field?.label}</FormLabel>
                                <TextField
                                    variant='standard'
                                    type='file'
                                    placeholder={field?.placeholder}
                                    name={field?.name}
                                    value={formik?.values[field?.name]}
                                    onChange={formik?.handleChange} />
                            </FormControl>
                        </Box>
                    );
                    break;

                case "date":
                    fieldHTML = (
                        <Box sx={{ bgcolor: '#E9DFC3', p: '20px', borderRadius: '1px' }}>
                            <FormControl sx={{ minWidth: '50%' }}>
                                <FormLabel sx={{ color: '#000' }}>{field?.label}</FormLabel>
                                <TextField
                                    variant='standard'
                                    type='date'
                                    name={field?.name}
                                    placeholder={field?.placeholder}
                                    value={formik?.values[field?.name]}
                                    onChange={formik?.handleChange} />
                            </FormControl>
                        </Box>
                    );
                    break;

                case "checkbox-group":
                    fieldHTML = (
                        <FormControl fullWidth sx={{ bgcolor: '#E9DFC3', p: '20px', borderRadius: '1px' }}>
                            <FormLabel sx={{ color: '#000' }}>{field?.label}</FormLabel>
                            <FormGroup>
                                {field?.values && field?.values?.map((checkbox, index) => (
                                    <FormControlLabel key={index} control={<Checkbox name={checkbox?.label} value={formik?.values[field?.name]} onChange={formik?.handleChange} />} label={checkbox?.label} />))}
                            </FormGroup>
                        </FormControl>
                    );
                    break;

                case "button":
                    fieldHTML = (
                        <div className="" style={{ display: 'flex', justifyContent: 'center' }}>
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
                        <Box sx={{ bgcolor: '#E9DFC3', p: '20px', borderRadius: '1px' }}>
                            <FormControl sx={{ minWidth: '50%' }}>
                                <FormLabel sx={{ color: '#000' }}>{field?.label}</FormLabel>
                                <TextField
                                    variant='standard'
                                    name={field?.name}
                                    placeholder={field?.placeholder}
                                    value={formik?.values[field?.name]}
                                    onChange={formik?.handleChange} />
                            </FormControl>
                        </Box>
                    );
                    break;

                case "paragraph":
                    fieldHTML = (
                        <Box sx={{ bgcolor: '#E9DFC3', padding: '20px', borderRadius: '1px' }}>
                            <Typography className={field?.className} style={{ fontSize: '10px' }}>{field?.label}</Typography>
                        </Box>
                    );
                    break;

                case "header":
                    fieldHTML = (
                        <Box sx={{ bgcolor: '#E9DFC3', p: '20px', borderRadius: '1px', borderLeft: '10px solid #a39a91 ' }}>
                            <Typography variant='h2' sx={{ fontSize: '30px', color: '#000' }}>{field?.label}</Typography>
                        </Box>
                    );
                    break;

                default:
                    break;
            }

            return fieldHTML;
        });
    };
    const home = () => {
        setPreview(false)
        setSelectedTemplate(null)
    }

    return (
        <div style={{ backgroundColor: '#053146', height: 'auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, p: '20px', width: '80%', margin: 'auto' }}>
                <Button variant='outlined' onClick={home}>Edit Form</Button>
            </Box>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                width: '70%',
                margin: 'auto',
                // padding: '50px',
                gap: '2px'
            }}>
                {generateForm(formData)}
            </div>
            <Divider sx={{ mt: '10px' }} />
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, p: '20px' }}>
                <Button variant='contained' onClick={formik.handleSubmit}>Save</Button>
                <Button variant='outlined' onClick={formik.resetForm}>Clear</Button>
            </Box>
        </div>
    )
}

export default TemplateThree