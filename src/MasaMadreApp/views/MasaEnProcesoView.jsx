
import { Backdrop, ButtonGroup, CircularProgress, Divider, IconButton, LinearProgress, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import Button from '@mui/material/Button';
import React, { useState, useEffect } from 'react'
import TimerIcon from '@mui/icons-material/Timer';
import TimerOffIcon from '@mui/icons-material/TimerOff';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import NotesIcon from '@mui/icons-material/Notes';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import UpdateIcon from '@mui/icons-material/Update';
import Cronometro from '../../Functions/Cronometro';
import { useDispatch, useSelector } from 'react-redux';
import { endMasaForzado, startConsultarMasaActual, startEndMasa, startStartMasa } from '../../store/MasaMadre/Thunks';
import { obtenerHoraActual } from '../../Functions/HoraActual';
import { CalculateWorkTime } from '../../Functions/CalcularTiempo';

export const MasaEnProcesoView = () => {
    const dispatch=useDispatch();
    const {Estatus}=useSelector(state=>state.masaMadre);
    
    const [isTimeToTrigger, setIsTimeToTrigger] = useState(false);
    const [isLoading, setisLoading] = useState(true);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(startConsultarMasaActual());
            } catch (error) {
                console.error("Error al consultar la masa actual:", error);
            } finally {
                setisLoading(false);
            }
        };
    
        fetchData();
    }, []);
    

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const currentMinutes = now.getMinutes();
      if (currentMinutes % 30 === 0) {
        if(Estatus!="Finalizado"){
            dispatch(endMasaForzado());      
        } 
        setIsTimeToTrigger(true);
        dispatch(startConsultarMasaActual());
      } else {
        setIsTimeToTrigger(false);
      }
    };
    checkTime();

    // Intervalo para verificar la hora cada minuto (o según sea necesario)
    const intervalId = setInterval(checkTime, 60000); // 60000 milisegundos = 1 minuto

    return () => {
      clearInterval(intervalId);
    };
  }, []);

    
    const masaMadreData=useSelector(state=>state.masaMadre);

    const startMasa=()=>{
        const actualDate = obtenerHoraActual();
        dispatch(startStartMasa(actualDate));
    }

    const endMasa = () => {
        const actualDate = obtenerHoraActual();
        const resp = CalculateWorkTime(masaMadreData.HoraDeInicio, actualDate);
        dispatch(startEndMasa(actualDate,resp));
    }
    
    

  return (
    <>
    {(isLoading)?(
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    ):(
    <Container sx={{width: '40%', backgroundColor: '#E0E0E0',borderRadius:'20px', height:'450px', boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px', marginBottom:'20px'}}>
        <Box name="titulo" sx={{width: '100%',color:'white'}}>
            {(masaMadreData.Masa!='')?
            <Typography color="black" sx={{fontSize: '30px'}}>{masaMadreData.Masa}</Typography>
            :
            <Typography color="black" sx={{fontSize: '30px'}}>Masa no seleccionada</Typography>
            }
        </Box>
        <Box sx={{backgroundColor: 'white', height:'70%', borderRadius:'10px', boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px'}}>
        <Box sx={{padding: '20px'}}>
            <List>
            <ListItem>
                    <ListItemIcon>
                        <AccessTimeFilledIcon />
                    </ListItemIcon>
                    <Typography sx={{ fontWeight: 'bold' }}>Hora de inicio prevista:</Typography>
                    <Typography sx={{marginLeft: '10px'}}>{masaMadreData.HoraDeInicioPrevista}</Typography>
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemIcon>
                        <UpdateIcon />
                    </ListItemIcon>
                    <Typography sx={{ fontWeight: 'bold' }}>Tiempo: </Typography>
                    <Typography sx={{marginLeft: '10px'}}><Cronometro/></Typography>
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemIcon>
                        <TimerIcon color="success"/>
                    </ListItemIcon>
                    <Typography sx={{ fontWeight: 'bold' }}>Hora de inicio:</Typography>
                    <Typography sx={{marginLeft: '10px'}}>{masaMadreData.HoraDeInicio}</Typography>
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemIcon>
                        <TimerOffIcon color="success"/>
                    </ListItemIcon>
                    <Typography sx={{ fontWeight: 'bold' }}>Hora de finalizacion:</Typography>
                    <Typography sx={{marginLeft: '10px'}}>{masaMadreData.HoraDeFinalizacion}</Typography>
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemIcon>
                        <TimelapseIcon color="info"/>
                    </ListItemIcon>
                    <Typography sx={{ fontWeight: 'bold' }}>Duracion:</Typography>
                    <Typography sx={{marginLeft: '10px'}}>{masaMadreData.Duracion}</Typography>
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemIcon>
                        <NotesIcon color="info"/>
                    </ListItemIcon>
                    <Typography sx={{ fontWeight: 'bold' }}>Estatus:</Typography>
                    <Typography sx={{marginLeft: '10px'}}>{masaMadreData.Estatus}</Typography>
                </ListItem>
            </List>
        </Box>
        </Box>
        <Box sx={{margin: '20px'}}>
            {(masaMadreData.HoraDeInicio=='' && masaMadreData.Masa!='')?
                <Button variant="contained" color="success" size="large" fullWidth onClick={startMasa} startIcon={<PlayCircleIcon/>}>INICIAR</Button>
                :(null)}  
            {(masaMadreData.HoraDeInicio!='' &&masaMadreData.HoraDeFinalizacion=='')?(    
                <Button variant="contained" color="secondary" size="large" fullWidth onClick={endMasa} startIcon={<StopCircleIcon/>}>FINALIZAR</Button>  
            ):(null)
            } 
        </Box>
  </Container>
    )}
  </>
  )
}
