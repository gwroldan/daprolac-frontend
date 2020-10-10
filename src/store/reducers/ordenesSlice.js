import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector
} from "@reduxjs/toolkit";
import axios from "axios";
import { normalize } from "normalizr";

import { ordenEntity } from "../schemas";

const ordenesAdapter = createEntityAdapter();

const initialState = ordenesAdapter.getInitialState({
  status: "idle",
  error: null
});

export const fetchOrdenes = createAsyncThunk(
  "ordenes/fetchOrdenes",
  async () => {
    const response = await axios.get(
      "https://daprolac.herokuapp.com/api/v1/ordenes?eager=1"
    );
    const normalized = normalize(response.data.payload, [ordenEntity]);
    return normalized.entities;
  }
);

export const addNewOrden = createAsyncThunk(
  "ordenes/addNewOrden",
  async orden => {
    const response = await axios.post(
      "https://daprolac.herokuapp.com/api/v1/ordenes",
      orden
    );
    const normalized = normalize(response.data.payload, ordenEntity);
    return normalized.entities;
  }
);

export const deleteOrden = createAsyncThunk(
  "ordenes/deleteOrden",
  async idOrden => {
    const response = await axios.delete(
      `https://daprolac.herokuapp.com/api/v1/ordenes/${idOrden}`
    );
    return response.data.payload;
  }
);

const slice = createSlice({
  name: "ordenes",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchOrdenes.pending]: state => {
      state.status = "loading";
    },
    [fetchOrdenes.fulfilled]: (state, action) => {
      state.status = "succeeded";

      const ordenes = action.payload.ordenes ? action.payload.ordenes : {}
      ordenesAdapter.upsertMany(state, ordenes);
    },
    [fetchOrdenes.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [addNewOrden.fulfilled]: (state, action) => {
      const ordenes = action.payload.ordenes ? action.payload.ordenes : {}
      ordenesAdapter.upsertMany(state, ordenes);
    },
    [addNewOrden.rejected]: (state, action) => {
      state.error = action.error.message;
    }
  }
});

export const {
  selectAll: selectAllOrdenes,
  selectById: selectOrdenById,
  selectIds: selectOrdenIds
} = ordenesAdapter.getSelectors(state => state.ordenes);

export const selectOrdenesWithNested = createSelector(
    [
      selectAllOrdenes,
      (state) => state.procesos.ids.map((id) => state.procesos.entities[id]),
    ],
    (ordenes, procesos) => {
      return ordenes.map(orden => {
        return {
          ...orden,
          proceso: procesos.filter( proceso => parseInt(proceso.id) === parseInt(orden.idProceso)).pop()
        }
      });
    }
)
export default slice.reducer;
