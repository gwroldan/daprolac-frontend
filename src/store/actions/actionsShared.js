import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const addNewDatoTarea = createAsyncThunk("datos/addNewDatoTarea",async (dato) => {
  const {
    idTarea,
    nombre,
    unidadMedida,
    tipo,
    minimo,
    maximo,
    opciones,
    obligatorio } = dato;

  const datoPost = {
    nombre,
    unidadMedida,
    tipo,
    minimo: tipo === 'numero' ? minimo : 0,
    maximo: tipo === 'numero' ? maximo : 0,
    tarea: {
      idTarea,
      obligatorio
    }
  }

  if (tipo === 'opcion') {
    const opcionesPost = []
    opciones.forEach(valor => {
      const elemento = { valor };
      opcionesPost.push(elemento);
    });

    datoPost.opciones = opcionesPost;
  }

  const response = await axios.post(`https://daprolac.herokuapp.com/api/v1/datos`, datoPost);

  return {
    id: response.data.payload.id,
    nombre,
    unidadMedida,
    tipo,
    minimo,
    maximo,
    opciones,
    idTarea,
    obligatorio
  }
});

export const deleteDatoTarea = createAsyncThunk("datos/deleteDatoTarea",async (idDato) => {
  const response = await axios.delete(`https://daprolac.herokuapp.com/api/v1/datos/${idDato}`);

  return {
    id: response.data.payload.id,
  }
});

export const addNewTareaProceso = createAsyncThunk("tareas/addNewTareaProceso",async (tarea) => {
  const {
    nombre,
    observaciones,
    idProceso,
    idTareaAntecesora,
    diasAntecesora,
    horasAntecesora,
    minutosAntecesora } = tarea;

  const tareaPost = {
    nombre,
    observaciones,
    proceso: {
      idProceso
    }
  }

  let tareaAntecesora = {};
  if (idTareaAntecesora !== null) {
    tareaAntecesora = {
      idTareaAntecesora,
      diasAntecesora,
      horasAntecesora,
      minutosAntecesora
    }
  }

  if (Object.keys(tareaAntecesora).length) {
    tareaPost.proceso.tareaAntecesora = tareaAntecesora;
  }

  const response = await axios.post(`https://daprolac.herokuapp.com/api/v1/tareas`, tareaPost);

  return {
    id: response.data.payload.id,
    nombre,
    observaciones,
    idProceso,
    idTareaAntecesora,
    diasAntecesora,
    horasAntecesora,
    minutosAntecesora
  }
});

export const deleteTareaProceso = createAsyncThunk("tareas/deleteTareaProceso",async (idTarea) => {
  const response = await axios.delete(`https://daprolac.herokuapp.com/api/v1/tareas/${idTarea}`);

  return {
    id: response.data.payload.id,
  }
});


