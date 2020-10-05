import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { fetchProcesos } from "./procesosSlice";

const datosAdapter = createEntityAdapter();

export const slice = createSlice({
  name: "datos",
  initialState: datosAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [fetchProcesos.fulfilled]: (state, action) => {
      const datos = action.payload.datos ? action.payload.datos: {}
      datosAdapter.upsertMany(state, datos);
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
