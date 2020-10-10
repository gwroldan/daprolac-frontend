import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { fetchProcesos } from "./procesosSlice";
import { addNewDatoTarea, deleteDatoTarea } from "../actions/actionsShared";

const datosAdapter = createEntityAdapter();

export const slice = createSlice({
  name: "datos",
  initialState: datosAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [fetchProcesos.fulfilled]: (state, action) => {
      const datos = action.payload.datos ? action.payload.datos: {}
      datosAdapter.upsertMany(state, datos);
    },
    [addNewDatoTarea.fulfilled]: (state, action) => {
      const { id, nombre, unidadMedida, tipo, minimo, maximo, opciones } = action.payload;
      const datoExistente = state.entities[id];
      if (datoExistente) {
        datosAdapter.updateOne(state, { id, changes: { nombre, unidadMedida, tipo, minimo, maximo, opciones }});
      } else {
        datosAdapter.addOne(state, { id, nombre, unidadMedida, tipo, minimo, maximo, opciones });
      }
    },
    [deleteDatoTarea.fulfilled]: (state, action) => {
      datosAdapter.removeOne(state, action.payload.id);
    }
  }
});

const reducer = slice.reducer;
export default reducer;

export const {
  selectById: selectDatoById,
  selectIds: selectDatoIds,
  selectEntities: selectDatoEntities,
  selectAll: selectAllDatos,
  selectTotal: selectTotalDatos
} = datosAdapter.getSelectors((state) => state.datos);
