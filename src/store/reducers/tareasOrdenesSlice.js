import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { fetchOrdenes } from "./ordenesSlice";

const tareasOrdenesAdaptar = createEntityAdapter({
  selectId: tareaOrden =>
    `${tareaOrden.idOrden}-${tareaOrden.idTarea}-${tareaOrden.idUsuario}`
});

export const slice = createSlice({
  name: "tareasOrdenes",
  initialState: tareasOrdenesAdaptar.getInitialState(),
  reducers: {},
  extraReducers: {
    [fetchOrdenes.fulfilled]: (state, action) => {
      const tareasOrdenes = action.payload.tareasOrdenes
        ? action.payload.tareasOrdenes
        : {};
      tareasOrdenesAdaptar.upsertMany(state, tareasOrdenes);
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
} = tareasOrdenesAdaptar.getSelectors(state => state.procesosTareas);
