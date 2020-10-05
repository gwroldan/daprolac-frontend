import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

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
