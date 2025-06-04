import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import img from '../assets/images/formImg.jpg'
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from "@mui/material";

const TemplateTwo = ({ formData, setPreview, setSelectedTemplate }) => {
    const navigate = useNavigate();

    const initialValues = {}
    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
     formik?.resetForm();
        }
    });

    const generateForm = (fields) => {
        return fields?.map((field, index) => {
            let fieldHTML = null;
            const fieldName = field?.name || field?.label?.toLowerCase()?.replace(/\s/g, '_');

            switch (field?.type) {
                case "textarea":
                    fieldHTML = (
                        <Box sx={{ bgcolor: '#fff', p: '20px', borderRadius: '10px', borderLeft: '3px solid #673ab7' }}>
                            <FormControl fullWidth>
                                <FormLabel>{field?.label}</FormLabel>
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
                    fieldHTML = (<Box sx={{ bgcolor: '#fff', p: '20px', borderRadius: '10px', borderLeft: '3px solid #673ab7' }}>
                        <FormControl sx={{ minWidth: 250 }}>
                            <FormLabel htmlFor={field?.name}>{field?.label}</FormLabel>
                            <Select
                                name={field?.name}
                                value={formik?.values[field?.name]}
                                onChange={formik?.handleChange}
                                size='small'
                            >
                                <MenuItem value=''><em> Please Select </em></MenuItem>
                                {field?.values && field?.values?.map((option, index) => (
                                    <MenuItem value={option?.value} key={field?.id}>{option?.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    );
                    break;

                case "radio-group":
                    fieldHTML = (
                        <Box sx={{ bgcolor: '#fff', p: '20px', borderRadius: '10px', borderLeft: '3px solid #673ab7' }}>
                            <FormControl>
                                <FormLabel>{field?.label}</FormLabel>
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
                        <Box sx={{ bgcolor: '#fff', p: '20px', borderRadius: '10px', borderLeft: '3px solid #673ab7' }}>
                            <FormControl fullWidth>
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
                        <Box sx={{ bgcolor: '#fff', p: '20px', borderRadius: '10px', borderLeft: '3px solid #673ab7' }}>
                            <FormControl sx={{ minWidth: '50%' }}>
                                <FormLabel>{field?.label}</FormLabel>
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
                        <Box sx={{ bgcolor: '#fff', p: '20px', borderRadius: '10px', borderLeft: '3px solid #673ab7' }}>
                            <FormControl sx={{ minWidth: '50%' }}>
                                <FormLabel>{field?.label}</FormLabel>
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
                        <FormControl fullWidth sx={{ bgcolor: '#fff', p: '20px', borderRadius: '10px', borderLeft: '3px solid #673ab7' }}>
                            <FormLabel>{field?.label}</FormLabel>
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
                        <Box sx={{ bgcolor: '#fff', p: '20px', borderRadius: '10px', borderLeft: '3px solid #673ab7' }}>
                            <FormControl fullWidth>
                                <FormLabel>{field?.label}</FormLabel>
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
                        <Box sx={{ bgcolor: '#fff', p: '20px', borderRadius: '10px', borderLeft: '3px solid #673ab7' }}>
                            <Typography className={field?.className} style={{ fontSize: '10px' }}>{field?.label}</Typography>
                        </Box>
                    );
                    break;

                case "header":
                    fieldHTML = (
                        <Box sx={{ bgcolor: '#fff', p: '20px', borderRadius: '10px', borderLeft: '3px solid #673ab7' }}>
                            <Typography variant='h2' sx={{ fontSize: '30px' }}>{field?.label}</Typography>
                        </Box>
                    );
                    break;

                default:
                    break;
            }

            return fieldHTML;
        });
    };

    return (
        <div style={{ display: 'flex', height: '100%', width: '100%' }}>
            <div style={{ width: '40%' }}>
                <img
                    src={img}
                    alt="bgImg"
                    style={{ width: '100%', height: '100vh', objectFit: 'cover', position: 'sticky', top: 0 }}
                />
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#f0ebf8',
                width: '60%',
            }}>
                <button onClick={() => {
                    setPreview(false)
                    setSelectedTemplate(null)
                }} style={{
                    alignSelf: 'flex-end',
                    background: '#673ab7',
                    borderRadius: '10px',
                    color: '#fff',
                    border: 'none',
                    margin: '10px'
                }}>Edit Form</button>

                <form
                    onSubmit={formik.handleSubmit}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        width: '100%',
                        padding: '0px 10px',
                        paddingBottom: '50px'
                    }}
                >
                    {generateForm(formData)}
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, p: '20px' }}>
                        <Button variant='contained' onClick={formik.handleSubmit}>Save</Button>
                        <Button variant='outlined' onClick={formik.resetForm}>Clear</Button>
                    </Box>
                </form>
            </div>
        </div >
    );
};

export default TemplateTwo;
