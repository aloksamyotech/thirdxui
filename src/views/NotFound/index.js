import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/ThirdexLogo.png';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <Box
        component="img"
        src={Logo}
        alt="Company Logo"
        sx={{ height: 80, mb: 1 }}
      />
      <Typography variant="h2" component="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        Sorry, the page you are looking for does not exist.
      </Typography>
      <Button
        variant="outlined"
        size="large"
        onClick={() => navigate('/')}
       
      >
        Go to Home
      </Button>
    </Container>
  );
};

export default NotFoundPage;
