import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { fetchProcesos } from "./procesosSlice";

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
