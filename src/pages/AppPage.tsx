import React from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  AppBar,
  Toolbar,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

const AppPage: React.FC = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Authentication Demo
          </Typography>
          <Button color="inherit" onClick={handleSignOut}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      
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
            <Typography component="h1" variant="h4" gutterBottom>
              Welcome to Easy Generator Assessment
            </Typography>
            
            {user && (
              <Typography variant="h6" sx={{ mt: 2 }}>
                Hello, {user.name}!
              </Typography>
            )}
            
            <Typography variant="body1" sx={{ mt: 4 }}>
              You have successfully signed in to the protected area of the application.
            </Typography>
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default AppPage; 