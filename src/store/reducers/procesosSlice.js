import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector
} from '@reduxjs/toolkit';
import axios from 'axios';
import { normalize } from 'normalizr';

import { procesoEntity } from '../schemas';
import { addNewTareaProceso } from "../actions";

const procesosAdapter = createEntityAdapter();

const initialState = procesosAdapter.getInitialState({
  status: "idle",
  error: null
});

const sortTareas = (tareasProceso) => {
  const sortedTareas = [];
  const map = new Map();

  let idTarea = null;
  tareasProceso.forEach((tarea, i) => {
    if (tarea.idTareaAntecesora === null) {
      idTarea = tarea.idTarea
      sortedTareas.push(tarea);
    } else {
      map.set(tarea.idTareaAntecesora, i);
    }
  });

  while (sortedTareas.length < tareasProceso.length) {
    let nextTarea = tareasProceso[map.get(idTarea)];
    sortedTareas.push(nextTarea);
    idTarea = nextTarea.idTarea;
  }

  return sortedTareas;
}

export const fetchProcesos = createAsyncThunk("procesos/fetchProcesos", async () => {
  const response = await axios.get('https://daprolac.herokuapp.com/api/v1/procesos?eager=1');
  const normalized = normalize(response.data.payload, [procesoEntity]);
  return normalized.entities;
});

export const addNewProceso = createAsyncThunk("procesos/addNewProceso",async (proceso) => {
  const response = await axios.post('https://daprolac.herokuapp.com/api/v1/procesos', proceso);
  return response.data.payload;
});

export const updateProceso = createAsyncThunk("procesos/updateProceso",async (proceso) => {
  const { id, producto } = proceso;
  const response = await axios.put(`https://daprolac.herokuapp.com/api/v1/procesos/${id}`, { producto });
  return response.data.payload;
});

export const deleteProceso = createAsyncThunk("procesos/deleteProceso",async (idProceso) => {
  const response = await axios.delete(`https://daprolac.herokuapp.com/api/v1/procesos/${idProceso}`);
  return response.data.payload;
});

const slice = createSlice({
  name: "procesos",
  initialState,
  reducers: {
    procesoActualizado(state, action) {
      const { id, producto } = action.payload;
      const procesoExistente = state.entities[id];
      if (procesoExistente) {
        procesoExistente.producto = producto;
      }
    }
  },
  extraReducers: {
    [fetchProcesos.pending]: (state) => { state.status = "loading" },
    [fetchProcesos.fulfilled]: (state, action) => {
      state.status = "succeeded";
      procesosAdapter.upsertMany(state, action.payload.procesos);
    },
    [fetchProcesos.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [addNewProceso.fulfilled]: procesosAdapter.addOne,
    [updateProceso.fulfilled]: (state, action) => {
      const { id, producto } = action.payload;
      procesosAdapter.updateOne(state, { id, changes: { producto }});
    },
    [deleteProceso.fulfilled]: (state, action) => {
      procesosAdapter.removeOne(state, action.payload.id);
    },
    [addNewTareaProceso.fulfilled]: (state, action) => {
      const { id, idProceso } = action.payload;
      state.entities[idProceso].tareas.push(id);
    }
  }
});

export const { procesoActualizado } = slice.actions;

export const {
  selectAll: selectAllProcesos,
  selectById: selectProcesoById,
  selectIds: selectProcesoIds
} = procesosAdapter.getSelectors((state) => state.procesos);

export const selectTareasByProcesoId = (idProceso) =>
    createSelector(
      [
        (state) => selectProcesoById(state, idProceso),
        (state) => state.tareas.ids.map((id) => state.tareas.entities[id]),
        (state) => state.procesosTareas.ids.map((id) => state.procesosTareas.entities[id]),
        (state) => state.datos.ids.map((id) => state.datos.entities[id])
      ],
      (proceso, tareas, tareasProceso, datos) => {
        let tareasProc = tareasProceso.filter(tarea => parseInt(tarea.idProceso) === parseInt(idProceso));
        tareasProc = sortTareas(tareasProc);

        const mapTareasProc = {}
        tareasProc.forEach((tareaProc, index) => mapTareasProc[tareaProc.idTarea] = index);

        const tareasComplete = [];
        const tareasU = tareas.filter((tarea) => proceso.tareas.includes(tarea.id));
        tareasU.forEach( tarea => {
          const idxOrder = mapTareasProc[tarea.id];
          const tareaOrder = { ...tarea, proceso_tarea: tareasProc[idxOrder] };

          if (tareaOrder.datos && tareaOrder.datos.length) {
            tareaOrder.datos = datos.filter( dato => tareaOrder.datos.includes(dato.id));
          }

          tareasComplete[idxOrder] = tareaOrder;
        });

        return tareasComplete;
      }
    );

export default slice.reducer;
