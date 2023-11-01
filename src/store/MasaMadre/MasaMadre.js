import { createSlice } from '@reduxjs/toolkit';
export const MasaMadreSlice = createSlice({
name: 'MasaMadre',
initialState: {
Masa: '',    
Tiempo: '',
HoraDeInicioPrevista: '',
HoraDeFinalizacion: '',
HoraDeInicio: '',
Duracion: '',
Estatus: '',
uid: '',
registros: [],
},
reducers: {
    setTiempo:(state, action)=>{
        state.Tiempo=action.payload;
    },
    setHoraDeInicio:(state,action)=>{
        state.HoraDeInicio=action.payload;
    },  
    setHoraDeFinalizacion:(state,action)=>{
        state.HoraDeFinalizacion=action.payload;
    },
    setDuracion:(state,action)=>{
        state.Duracion=action.payload;
    },
    setEstatus:(state,action)=>{
        state.Estatus=action.payload;
    },
    setHoraDeInicioPrevista:(state, action)=>{
        state.HoraDeInicioPrevista=action.payload;
    },
    setMasa:(state,action)=>{
        state.Masa=action.payload;
    },
    setUid:(state,action)=>{
        state.uid=action.payload;
    },
    setRegistros:(state,action)=>{
        state.registros=action.payload;
    }

}
});
// Action creators are generated for each case reducer function
export const { setTiempo, setHoraDeInicio, setHoraDeFinalizacion, setRegistros,
    setDuracion, setEstatus, setHoraDeInicioPrevista,setUid, setMasa } = MasaMadreSlice.actions;