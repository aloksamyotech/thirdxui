import { Box, Button, Card, Checkbox, FormControlLabel, Grid, MenuItem, Select, Switch, Tab, TextField, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import { Circle } from "@mui/icons-material";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Stack } from '@mui/system';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const Appearance = () => {
  const [color, setColor] = useState('#BBB2FF');
  const [value, setValue] = useState('1');
  const [valueInner, setValueInner] = useState('3');

  const handleChng = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeInner = (event, newValue) => {
    setValueInner(newValue);
  };
  const htmlCode = `
  <!DOCTYPE html>
  <html lang="en">
  <head> 
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Standalone Form</title> 
  <style> body { font-family: Arial, sans-serif; background-color: #f7f7f7; margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; } .form-container { background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); width: 100%; max-width: 400px; } .form-container h2 { margin: 0 0 15px; font-size: 1.5em; color: #333; } .form-container label { font-size: 0.9em; margin-bottom: 5px; display: block; color: #555; } .form-container input[type="text"], .form-container input[type="email"], .form-container textarea { width: 100%; padding: 10px; margin-bottom: 15px; border: 1px solid #ddd; border-radius: 4px; font-size: 1em; } .form-container button { background: #4CAF50; color: #fff; padding: 10px 15px; border: none; border-radius: 4px; font-size: 1em; cursor: pointer; } .form-container button:hover { background: #45a049; } 
  </style> 
  </head> 
  <body> 
  <div class="form-container"> 
  <h2>Contact Us</h2> 
  <form action="#" method="POST"> 
  <label for="name">Name</label> 
  <input type="text" id="name" name="name" placeholder="Enter your name" required> 
  <label for="email">Email</label> 
  <input type="email" id="email" name="email" placeholder="Enter your email" required> 
  <label for="message">Message</label> 
  <textarea id="message" name="message" placeholder="Enter your message" rows="4" required></textarea> 
  <button type="submit">Submit</button> 
  </form> 
  </div> 
  </body> 
  </html>`

  const handleChange = (event) => {
    setColor(event.target.value);
  };
  const label = { inputProps: { 'aria-label': 'demo' } };
  return (
    <>
      <Box sx={{ width: '100%', typography: 'body1', bgcolor: '#eef2f6', borderRadius: '10px', minHeight: '100vh' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChng} textColor="secondary" indicatorColor="secondary">
              <Tab label="Form Appearance" value="1" />
              <Tab label="Standalone Form" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ px: 0 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography sx={{ color: '#000', fontSize: '12px', fontWeight: '500' }}>Colors</Typography>
                <Box>
                  <Typography sx={{ bgcolor: '#fff', p: '10px', borderRadius: '5px', fontSize: '12px', color: '#364152', mt: '5px' }}>You can set the colours you want to use by entering a recognised colour name eg. red, blue etc or a value e g. #cbe03 or select a colour using the colour selector leave empty to use the default colours.</Typography>
                  <Grid container spacing={2} sx={{ mt: '20px' }}>
                    <Grid item={6}>
                      <Typography sx={{ color: '#000', fontSize: '12px', fontWeight: '500', mb: '10px' }}>Form Font Colour</Typography>
                      <Select
                        value={color}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        renderValue={(selected) => (
                          <Box display="flex" alignItems="center">
                            <Circle sx={{ color: selected, marginRight: 1 }} />
                            {selected}
                          </Box>)}
                        sx={{
                          width: '200px',
                          "&.MuiOutlinedInput-root": {
                            "& fieldset": { border: "none" },
                          },
                          "& .MuiSelect-select": {
                            display: "flex",
                            alignItems: "center",
                            height: "10px",
                            padding: "10px 14px",
                          }
                        }}
                      >
                        <MenuItem value="#FF0000">
                          <Circle sx={{ color: "#FF0000", marginRight: 1 }} />
                          Red
                        </MenuItem>
                      </Select>
                    </Grid>
                    <Grid item={6}>
                      <Typography sx={{ color: '#000', fontSize: '12px', fontWeight: '500', mb: '10px' }}>Form Background Colour</Typography>
                      <Select
                        value={color}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        renderValue={(selected) => (
                          <Box display="flex" alignItems="center">
                            <Circle sx={{ color: selected, marginRight: 1 }} />
                            {selected}
                          </Box>)}
                        sx={{
                          width: '200px',
                          "&.MuiOutlinedInput-root": {
                            "& fieldset": { border: "none" },
                          },
                          "& .MuiSelect-select": {
                            display: "flex",
                            alignItems: "center",
                            height: "10px",
                            padding: "10px 14px",
                          }
                        }}
                      >
                        <MenuItem value="#FF0000">
                          <Circle sx={{ color: "#FF0000", marginRight: 1 }} />
                          Red
                        </MenuItem>
                      </Select>
                    </Grid>
                    <Grid item={6}>
                      <Typography sx={{ color: '#000', fontSize: '12px', fontWeight: '500', mb: '10px' }}>Button Font Colour</Typography>
                      <Select
                        value={color}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        renderValue={(selected) => (
                          <Box display="flex" alignItems="center">
                            <Circle sx={{ color: selected, marginRight: 1 }} />
                            {selected}
                          </Box>)}
                        sx={{
                          width: '200px',
                          "&.MuiOutlinedInput-root": {
                            "& fieldset": { border: "none" },
                          },
                          "& .MuiSelect-select": {
                            display: "flex",
                            alignItems: "center",
                            height: "10px",
                            padding: "10px 14px",
                          }
                        }}
                      >
                        <MenuItem value="#FF0000">
                          <Circle sx={{ color: "#FF0000", marginRight: 1 }} />
                          Red
                        </MenuItem>
                      </Select>
                    </Grid>
                    <Grid item={6}>
                      <Typography sx={{ color: '#000', fontSize: '12px', fontWeight: '500', mb: '10px' }}>Button Background Colour</Typography>
                      <Select
                        value={color}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        renderValue={(selected) => (
                          <Box display="flex" alignItems="center">
                            <Circle sx={{ color: selected, marginRight: 1 }} />
                            {selected}
                          </Box>)}
                        sx={{
                          width: '200px',
                          "&.MuiOutlinedInput-root": {
                            "& fieldset": { border: "none" },
                          },
                          "& .MuiSelect-select": {
                            display: "flex",
                            alignItems: "center",
                            height: "10px",
                            padding: "10px 14px",
                          }
                        }}
                      >
                        <MenuItem value="#FF0000">
                          <Circle sx={{ color: "#FF0000", marginRight: 1 }} />
                          Red
                        </MenuItem>
                      </Select>
                    </Grid>
                  </Grid>
                </Box>
                <Typography sx={{ color: '#000', fontSize: '12px', fontWeight: '500', mt: '40px' }}>Fonts</Typography>
                <Typography sx={{ mt: '5px' }}>Choose the font you want to use with your forms</Typography>
                <Stack>
                  <Button variant='outlined'
                    color='secondary'
                    endIcon={<ArrowDownwardIcon />} sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}>Inter</Button>
                </Stack>
                <Typography sx={{ color: '#000', fontSize: '12px', fontWeight: '500', mt: '40px' }}>Form Style</Typography>
                <Box sx={{ display: 'inline', bgcolor: '#fff', px: "20px", py: '10px', borderRadius: '5px', border: '1px solid #e5e5e5' }}>
                  <FormControlLabel control={<Checkbox defaultChecked />} label="show forms in pannels?" />
                </Box>
                <Box sx={{ color: '#000', fontSize: '12px', fontWeight: '500', mt: '40px' }}>
                  <Typography sx={{ color: '#000', fontSize: '12px', fontWeight: '500', mb: '10px' }}>Button Background Colour</Typography>
                  <Select
                    value={color}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    renderValue={(selected) => (
                      <Box display="flex" alignItems="center">
                        <Circle sx={{ color: selected, marginRight: 1 }} />
                        {selected}
                      </Box>)}
                    sx={{
                      width: '200px',
                      "&.MuiOutlinedInput-root": {
                        "& fieldset": { border: "none" },
                      },
                      "& .MuiSelect-select": {
                        display: "flex",
                        alignItems: "center",
                        height: "10px",
                        padding: "10px 14px",
                      }
                    }}
                  >
                    <MenuItem value="#FF0000">
                      <Circle sx={{ color: "#BBB2FF", marginRight: 1 }} />
                      #BBB2FF
                    </MenuItem>
                  </Select>
                </Box>
              </Grid >
              <Grid item xs={6}>
                <Typography sx={{ color: '#000', fontSize: '12px', fontWeight: '500', mb: '5px' }}>Preview</Typography>
                <Card sx={{ minHeight: '100vh' }}>
                  <Card sx={{ boxShadow: '1px 1px 5px #e8e8e8', m: '20px' }}>
                    <Typography sx={{ my: '30px', ml: '15px' }}>Your Details</Typography>
                  </Card>
                  <Card sx={{ boxShadow: '1px 1px 5px #e8e8e8', m: '20px' }}>
                    <Grid container sx={{ m: '10px' }}>
                      <Grid item xs={6}>
                        <Typography>First Name</Typography>
                        <TextField size='small' />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>Last Name</Typography>
                        <TextField size='small' />
                      </Grid>
                    </Grid>
                  </Card>
                  <Card sx={{ boxShadow: '1px 1px 5px #e8e8e8', m: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                    <Button sx={{ my: '20px', bgcolor: '#f37920', mx: '10px' }} variant='contained'>Submit</Button>
                  </Card>
                </Card>
                <Box>
                </Box>
              </Grid>
            </Grid >
          </TabPanel>
          <TabPanel value="2" sx={{ px: 0 }}>
            <Box sx={{ bgcolor: '#fff', minHeight: '100vh', borderRadius: '10px', p: '20px' }}>
              <Typography>Do you want to make this form public</Typography>
              <Switch {...label} defaultChecked />
              <TabContext value={valueInner}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChangeInner} textColor="secondary" indicatorColor="secondary">
                    <Tab label="Embed Form" value='3' />
                    <Tab label="Standalone form" value='4' />
                    <Tab label="SME" value='5' />
                  </TabList>
                </Box>
                <TabPanel value='3'>
                  <Typography>Copy and Paste this into your website in a custom code section</Typography>
                  <Box sx={{ p: '10px', mt: '20px', width: '550px', border: '1px solid #e8e8e8', height: '40vh', overflowY: 'scroll', borderRadius: '5px' }}>
                    <Typography sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
                      {htmlCode}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', width: '550px', mt: '10px', justifyContent: 'flex-end' }}>
                    <Button variant='contained' startIcon={<ContentCopyIcon />} sx={{ bgcolor: '#053146', '&:hover': { bgcolor: '#053146' } }}>COPY</Button>
                  </Box>
                </TabPanel>
                <TabPanel value='4'>
                  <Stack direction='row'>
                    <TextField fullWidth value='https://www.istockphoto.com/photo/abstract-composition' sx={{
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                    }} />
                    <Button variant='contained' startIcon={<ContentCopyIcon />} sx={{ bgcolor: '#053146', '&:hover': { bgcolor: '#053146' }, marginLeft: '-90px', borderRadius: '10px' }}>COPY</Button>
                  </Stack>
                </TabPanel>
                <TabPanel value='5'>
                </TabPanel>
              </TabContext>
            </Box>

          </TabPanel>
        </TabContext >
      </Box >
    </>
  )
}

export default Appearance