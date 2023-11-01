import { Alert, AlertTitle, IconButton, TextField, Typography } from '@mui/material'
import { Box, display } from '@mui/system'
import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { formateDate } from '../../Functions/formatedDate'
import { startRegistrosMasaMadre } from '../../store/MasaMadre/Thunks'
import RegistrosTable from '../components/RegistrosTable'
import { HomeLayout } from '../layout/HomeLayout'
import SearchIcon from '@mui/icons-material/Search';
import CurrentDate from '../../Functions/FechaActual'
import { async } from '@firebase/util'
import Swal from 'sweetalert2'

export const Registros = () => {
  const [fecha, setFecha] = useState(null);
  const {registros}=useSelector(state=>state.masaMadre);

  const dispatch=useDispatch();

  const serchInfo=()=>{
    const newDate = formateDate(fecha);
    dispatch(startRegistrosMasaMadre(newDate));
   
  }
  
  return (
    <HomeLayout>
        <Box sx={{width: '100%', padding: '20px'}}>
          <Box sx={{width: '100%', marginBottom: '20px', display: 'flex', alignContent: 'start'}}>
          <TextField
            label="Fecha a Consultar"
            type="date"
            variant="standard"
            InputLabelProps={{ shrink: true }}
            onChange={(e) => setFecha(e.target.value)}
          />
            <IconButton onClick={serchInfo}>
              <SearchIcon color="primary"/>
            </IconButton>
          </Box>
          {(registros.length>0)?
          <RegistrosTable/>
          :null
        }
        </Box>
    </HomeLayout>
  )
}
