import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { fetchProcesos } from "./procesosSlice";
import { addNewDatoTarea, deleteDatoTarea, deleteTareaProceso } from "../actions/actionsShared";

const tareasDatosAdapter = createEntityAdapter({
  selectId: (tareaDato) => `${tareaDato.idTarea}-${tareaDato.idDato}`
});

export const slice = createSlice({
  name: "tareasDatos",
  initialState: tareasDatosAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [fetchProcesos.fulfilled]: (state, action) => {
      const tareasDatos = action.payload.tareasDatos ? action.payload.tareasDatos: {}
      tareasDatosAdapter.upsertMany(state, tareasDatos);
    },
    [addNewDatoTarea.fulfilled]: (state, action) => {
      const tareaDato = {
        idTarea: action.payload.idTarea,
        idDato: action.payload.id,
        obligatorio: action.payload.obligatorio
      }
      tareasDatosAdapter.upsertOne(state, tareaDato);
    },
    [deleteDatoTarea.fulfilled]: (state, action) => {
      const idsDelete = state.ids.filter( id => id.toString().endsWith(`-${action.payload.id}`));
      tareasDatosAdapter.removeMany(state, idsDelete);
    },
    [deleteTareaProceso.fulfilled]: (state, action) => {
      const idsDelete = state.ids.filter( id => id.toString().startsWith(`${action.payload.id}-`));
      tareasDatosAdapter.removeMany(state, idsDelete);
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
} = tareasDatosAdapter.getSelectors((state) => state.procesosTareas);
