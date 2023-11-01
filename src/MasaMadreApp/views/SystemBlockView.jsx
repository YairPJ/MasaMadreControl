import { Alert, Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import LockIcon from '@mui/icons-material/Lock';

export const SystemBlockView = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '98vh',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fondo negro con opacidad
      }}
    >
      <Box
        component="main"
        sx={{
          width: '50%',
          height: '40vh',
          textAlign: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo negro con opacidad
          boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px',
          borderRadius: '20px',
          color: 'white',
          padding: '20px',
        }}
      >
        <LockIcon sx={{fontSize: '100px'}}/>
        <Typography variant="h3" color="white">SISTEMA BLOQUEADO</Typography>
        <hr/>
        <Typography variant="h6">El sistema se encuentra bloqueado debido a que cambiaste la ventana. Para realizar el desbloqueo del sistema comuniquese con su supervisor!!!</Typography>
      </Box>
    </Box>
  );
};
