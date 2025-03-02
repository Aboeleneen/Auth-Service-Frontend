import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleNavigateToApp = () => {
    navigate('/app');
  };

  const handleNavigateToSignIn = () => {
    navigate('/signin');
  };

  const handleNavigateToSignUp = () => {
    navigate('/signup');
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            width: '100%',
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          <Typography component="h1" variant="h3" gutterBottom>
            Authentication Demo
          </Typography>
          
          <Typography variant="h6" color="textSecondary" paragraph>
            A full-stack authentication module built with React, TypeScript, and NestJS.
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 2, 
            mt: 4 
          }}>
            {isAuthenticated ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNavigateToApp}
                size="large"
              >
                Go to Application
              </Button>
            ) : (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNavigateToSignIn}
                  size="large"
                >
                  Sign In
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleNavigateToSignUp}
                  size="large"
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Home; 