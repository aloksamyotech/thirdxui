import React, { useEffect, useState } from 'react';
import { InputAdornment, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getApi } from 'common/apiClient';
import { urls } from 'common/urls';
import SectionSkeleton from 'ui-component/Loader/SectionSkeleton';

const getCoordinates = async (placeName) => {
  const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(placeName)}`);
  const data = await response.json();
  if (data && data.length > 0) {
    return {
      name: placeName,
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon)
    };
  }
  return null;
};

const createCustomIcon = (text) => {
  return leaflet.divIcon({
    html: `
      <div style="
        width: 30px;
        height: 35px;
        background-color: green;
        border-top: 5px solid red;
        color: white;
        font-weight: bold;
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        box-shadow: 0 0 4px rgba(0,0,0,0.3);
      ">
        ${text}
      </div>
    `,
    className: '',
    iconSize: [40, 45],
    iconAnchor: [20, 45]
  });
};

const Map = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        const res = await getApi(urls.session.fetch);
        const sessions = res?.data?.allSession || [];

        const locationMap = {};
        sessions.forEach((session) => {
          const name = session?.country?.name;
          if (name) {
            locationMap[name] = (locationMap[name] || 0) + 1;
          }
        });

        const coords = await Promise.all(
          Object.entries(locationMap).map(async ([name, count]) => {
            const geo = await getCoordinates(name);
            if (geo) {
              return {
                name,
                count,
                lat: geo.lat,
                lon: geo.lon
              };
            }
            return null;
          })
        );

        const validCoords = coords.filter(Boolean);
        setLocations(validCoords);
      } catch (error) {
        console.error('Error fetching session locations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const mapCenter = [20.5937, 78.9629];

  return (
    <Box sx={{ bgcolor: '#fff', borderRadius: '10px', overflow: 'hidden', height: 'auto' }}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', p: '20px' }}>
        <Typography sx={{ fontSize: '16px', lineHeight: '22px' }}>Where We Have Deliver Session?</Typography>
        <Stack direction="row" spacing={1}>
          <Select value="This Week" size="small">
            <MenuItem value="This Week">This Week</MenuItem>
            <MenuItem value="This Month">This Month</MenuItem>
            <MenuItem value="This Year">This Year</MenuItem>
          </Select>
          <TextField
            variant="outlined"
            placeholder="Search"
            size="small"
            sx={{ maxWidth: 120 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </Stack>
      </Stack>
      <Stack>
        {loading ? (
          <SectionSkeleton lines={1} variant="rectangular" height={340} spacing={1} />
        ) : (
          <MapContainer center={mapCenter} zoom={2} style={{ width: '100%', height: '350px' }}>
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
            />
            {locations.map((loc, index) => (
              <Marker key={index} position={[loc.lat, loc.lon]} icon={createCustomIcon(loc.count)}>
                <Popup>{`${loc.name} - ${loc.count} sessions`}</Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </Stack>
    </Box>
  );
};

export default Map;
