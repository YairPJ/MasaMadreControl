import { Button, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React from 'react'
import { HomeLayout } from '../layout/HomeLayout'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { MasaEnProcesoView } from '../views/MasaEnProcesoView'
import Reloj from '../../Functions/Reloj'
import CurrentDate from '../../Functions/FechaActual'

export const Home = () => {

  const sweet=()=>{
    Swal.fire(
      'Jornada laboral iniciada',
      'La jornada laboral ha iniciado, puede comenzar a registrar',
      'success'
    )
  }
  return (
    <HomeLayout>
        <Box
        sx={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="h2">
          <Reloj />
        </Typography>
        <Box>
          <Typography>
            <CurrentDate />
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', width: '100%', alignContent: 'center', marginTop:'20px' }}>
        <MasaEnProcesoView/>
      </Box>
    </HomeLayout>
  )
}
