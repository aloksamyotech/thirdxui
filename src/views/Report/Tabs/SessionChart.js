import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getApi } from 'common/apiClient';
import { urls } from 'common/urls';
import leaflet from 'leaflet';
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

const MapBox = ({ locations, loading }) => {
  const center = [20.5937, 78.9629];

  const createCustomIcon = (text) => {
    return leaflet.divIcon({
      html: `
      <div style="
        width: 20px;
        height: 25px;
        background-color: green;
        border-top: 5px solid red;
        color: white;
        font-weight: bold;
        font-size: 8px;
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
      iconSize: [55, 70],
      iconAnchor: [27.5, 70]
    });
  };

  return (
    <>
      {loading ? (
        <SectionSkeleton lines={1} variant="rectangular" height={340} spacing={1} />
      ) : (
        <MapContainer center={center} zoom={2} style={{ width: '100%', height: '400px', borderRadius: '10px' }}>
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
    </>
  );
};

const SessionChart = () => {
  const [locationCoords, setLocationCoords] = useState([]);
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
        setLocationCoords(validCoords);
      } catch (error) {
        console.error('Error fetching session locations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  return (
    <Grid item xs={12}>
      <Typography sx={{ fontWeight: 600, fontSize: 16, mb: 1 }}>Map View - All Sessions</Typography>
      <Box
        sx={{
          backgroundColor: '#fff',
          boxShadow: '0px 4px 10px rgba(0,0,0,0.05)',
          borderRadius: '12px',
          overflow: 'hidden'
        }}
      >
        <MapBox locations={locationCoords} loading={loading} />
      </Box>
    </Grid>
  );
};

export default SessionChart;
