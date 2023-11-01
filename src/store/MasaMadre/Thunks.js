import { async } from "@firebase/util";
import { downloadDocument } from "../../Firebase/Proviers/downloadDocument";
import { downloadCollections } from "../../Firebase/Proviers/downloadCollections";
import { uploadDocument } from "../../Firebase/Proviers/uploadDocument";
import { obtenerHoraActual } from "../../Functions/HoraActual";
import { setHoraDeInicio, setHoraDeFinalizacion, setDuracion, setEstatus, setHoraDeInicioPrevista, setMasa, setUid, setRegistros } from "./MasaMadre"

export const startStartMasa = (hour) => {
    return async (dispatch, getState) => {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const fechaActual = `${day}_${month}_${year}`;

        const horaActual = obtenerHoraActual(); 
        const partes = horaActual.split(":");
        const horaConsultar = horaActual[0]+horaActual[1];
        let minutosConsultar = parseInt((horaActual[3]+horaActual[4]));
        if(minutosConsultar>=30){
            minutosConsultar="30"
        }else{
            minutosConsultar="00"
        }
        const consulta = horaConsultar+":"+minutosConsultar;


        const path = `/MasaMadre/Registros/${fechaActual}/${consulta}`;
        const data={"HoraDeInicio": hour, Estatus: 'En Proceso...'};
        const resp = await uploadDocument(path,data);
        if (resp){
            dispatch(setHoraDeInicio(hour));
            dispatch(setEstatus("En proceso..."));
        }else{
            console.log(resp);
        }
    }
}

export const startEndMasa = (hour, duration) => {
    return async (dispatch, getState) => {

        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const fechaActual = `${day}_${month}_${year}`;

        const horaActual = obtenerHoraActual(); 
        const partes = horaActual.split(":");
        const horaConsultar = horaActual[0]+horaActual[1];
        let minutosConsultar = parseInt((horaActual[3]+horaActual[4]));
        if(minutosConsultar>=30){
            minutosConsultar="30"
        }else{
            minutosConsultar="00"
        }
        const consulta = horaConsultar+":"+minutosConsultar;

        const {uid} = getState().masaMadre;


        const path = `/MasaMadre/Registros/${fechaActual}/${consulta}`;
        const data={"HoraDeFinalizacion": hour, "Duracion":duration, Estatus: 'Finalizado'};
        const resp = await uploadDocument(path,data);
        if (resp){
            dispatch(setHoraDeFinalizacion(hour));
            dispatch(setDuracion(duration));
            dispatch(setEstatus("Finalizado"));
        }else{
            console.log(resp);
        }
    }
}

export const startComentario=(comentario)=>{
    return async(dispatch)=>{
        dispatch(setComentario(comentario));
    }
}

export const startConsultarMasaActual=()=>{
    return async(dispatch,getState) => {
        const horaActual = obtenerHoraActual(); 
        const partes = horaActual.split(":");
        const horaConsultar = horaActual[0]+horaActual[1];
        let minutosConsultar = parseInt((horaActual[3]+horaActual[4]));
        if(minutosConsultar>=30){
            minutosConsultar="30"
        }else{
            minutosConsultar="00"
        }
        const consulta = horaConsultar+":"+minutosConsultar;

        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const fechaActual = `${day}_${month}_${year}`;

        const path=`/MasaMadre/Registros/${fechaActual}/${consulta}`
        const info = await downloadDocument(path);
        dispatch(setHoraDeInicioPrevista(info.HoraDeInicioPrevista));
        dispatch(setHoraDeInicio(info.HoraDeInicio));
        dispatch(setHoraDeFinalizacion(info.HoraDeFinalizacion));
        dispatch(setDuracion(info.Duracion));
        dispatch(setEstatus(info.Estatus));
        dispatch(setMasa(info.Masa));
        dispatch(setUid(info.uid));
    }
}

export const startRegistrosMasaMadre=(date)=>{
    return async(dispatch, getState)=>{
        const path=`/MasaMadre/Registros/${date}`;
        const info = await downloadCollections(path);
        dispatch(setRegistros(info));
    }
}

export const endMasaForzado=()=>{
    return async(dispatch, getState)=>{

        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const fechaActual = `${day}_${month}_${year}`;

        const {HoraDeInicioPrevista}=getState().masaMadre;
        const consulta=HoraDeInicioPrevista;
        
        const path = `/MasaMadre/Registros/${fechaActual}/${consulta}`;
        const data={"Estatus": "ERROR", "Comentario":"Finalizado por sistema"};
        await uploadDocument(path,data);
    }
}

