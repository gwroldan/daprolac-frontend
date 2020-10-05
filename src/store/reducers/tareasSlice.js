import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { fetchProcesos } from "./procesosSlice";
import { addNewTareaProceso } from "../actions";

const tareasAdapter = createEntityAdapter();

export const updateTarea = createAsyncThunk("tareas/updateTarea",async (tarea) => {
  const { id, nombre, observaciones } = tarea;
  const response = await axios.put(`https://daprolac.herokuapp.com/api/v1/tareas/${id}`, { nombre, observaciones });
  return response.data.payload;
});

export const slice = createSlice({
  name: "tareas",
  initialState: tareasAdapter.getInitialState(),
  reducers: {
    tareaActualizada(state, action) {
      const { id, producto } = action.payload;
      const procesoExistente = state.entities[id];
      if (procesoExistente) {
        procesoExistente.producto = producto;
      }
    }
  },
  extraReducers: {
    [fetchProcesos.fulfilled]: (state, action) => {
      const tareas = action.payload.tareas ? action.payload.tareas : {};
      tareasAdapter.upsertMany(state, tareas);
    },
    [updateTarea.fulfilled]: (state, action) => {
      const { id, nombre, observaciones } = action.payload;
      tareasAdapter.updateOne(state, { id, changes: { nombre, observaciones }});
    },
    [addNewTareaProceso.fulfilled]: (state, action) => {
      const { id, nombre, observaciones } = action.payload;
      tareasAdapter.addOne(state, { id, nombre, observaciones });
    },
    [addNewTareaProceso.rejected]: (state, action) => {
      console.log(action.error.message);
    }
  }
});

export const { tareaActualizada } = slice.actions;

const reducer = slice.reducer;
export default reducer;

export const {
  selectById: selectTareaById,
  selectIds: selectTareaIds,
  selectEntities: selectTareaEntities,
  selectAll: selectAllTareas,
  selectTotal: selectTotalTareas
} = tareasAdapter.getSelectors((state) => state.tareas);
