import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapBox = () => {
  return (
    <MapContainer center={[30.2741, 120.1551]} zoom={11} style={{ width: '100%', height: '300px', borderRadius: '10px' }}>
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
      />
    </MapContainer>
  );
};

const Chart = () => {
  return (
    <Grid item xs={12}>
      <Typography sx={{ fontWeight: 600, fontSize: 16, mb: 1 }}>Map View - Region 1</Typography>
      <Box
        sx={{
          backgroundColor: '#fff',
          boxShadow: '0px 4px 10px rgba(0,0,0,0.05)',
          borderRadius: '12px',
          overflow: 'hidden'
        }}
      >
        <MapBox />
      </Box>
    </Grid>
  );
};

export default Chart;
