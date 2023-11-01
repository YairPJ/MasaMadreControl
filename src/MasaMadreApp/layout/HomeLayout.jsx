import React, { useEffect, useState } from 'react';
import { Box, Container, Divider, Typography } from '@mui/material';
import { NavBar } from '../components/NavBar';
import Reloj from '../../Functions/Reloj';
import CurrentDate from '../../Functions/FechaActual';
import { SystemBlockView } from '../views/SystemBlockView';

export const HomeLayout = ({ children }) => {
  const [isWindowActive, setIsWindowActive] = useState(false);

  /*
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsWindowActive(true);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
  */


  return (
    <Box>
      {!isWindowActive ? (
      <> 
      <NavBar /> 
        <Box
          component="main"
          sx={{
            backgroundColor: 'white',
            width: '100%',
            minHeight: 0,
            padding: '10px',
          }}
        >
          {children}
        </Box>
        </>
      ) : (
        <SystemBlockView />
      )}
    </Box>
  );
};
