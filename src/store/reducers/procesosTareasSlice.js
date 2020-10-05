import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { fetchProcesos } from "./procesosSlice";
import { addNewTareaProceso } from "../actions/index";

const procesosTareasAdapter = createEntityAdapter({
  selectId: (procesoTarea) => `${procesoTarea.idProceso}-${procesoTarea.idTarea}`
});

export const slice = createSlice({
  name: "procesosTareas",
  initialState: procesosTareasAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [fetchProcesos.fulfilled]: (state, action) => {
      const procesosTareas = action.payload.procesosTareas ? action.payload.procesosTareas: {}
      procesosTareasAdapter.upsertMany(state, procesosTareas);
    },
    [addNewTareaProceso.fulfilled]: (state, action) => {
      const procesoTarea = {
        idProceso: action.payload.idProceso,
        idTarea: action.payload.id,
        idTareaAntecesora: action.payload.idTareaAntecesora,
        diasAntecesora: action.payload.diasAntecesora,
        horasAntecesora: action.payload.horasAntecesora,
        minutosAntecesora: action.payload.minutosAntecesora
      }
      procesosTareasAdapter.upsertOne(state, procesoTarea);
    }
  }
});

const reducer = slice.reducer;
export default reducer;

export const {
  selectById: selectProcesoTareaById,
  selectIds: selectProcesoTareaIds,
  selectEntities: selectProcesoTareaEntities,
  selectAll: selectAllProcesosTareas,
  selectTotal: selectTotalProcesosTareas
} = procesosTareasAdapter.getSelectors((state) => state.procesosTareas);
