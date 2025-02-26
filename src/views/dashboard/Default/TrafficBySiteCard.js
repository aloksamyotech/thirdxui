import PropTypes from 'prop-types';
import { Box, Card, Typography, CardHeader, CardContent, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// ----------------------------------------------------------------------

AppTrafficBySite.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired
};

export default function AppTrafficBySite({ title, subheader, list, ...other }) {
  return (
    <Card {...other} sx={{ paddingY: '20px' }}>
      {/* Title & Static "Type to filter" Text with Search Icon */}
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Type to filter
            </Typography>
            <SearchIcon sx={{ color: 'gray' }} />
          </Box>
        }
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: 'repeat(2, 1fr)' // 2 items per row
          }}
        >
          {list.map((site) => (
            <Box
              key={site.name}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5
              }}
            >
              {/* Small Image */}
              <Box
                component="img"
                src={site.image}
                alt={site.name}
                sx={{
                  width: 50,
                  height: 50,
                  objectFit: 'contain',
                  borderRadius: '10%'
                }}
              />
              {/* Text */}
              <Typography variant="body2" sx={{ color: 'text.primary' }}>
                {site.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
