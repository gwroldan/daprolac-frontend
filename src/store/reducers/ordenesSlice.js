import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector
} from "@reduxjs/toolkit";
import axios from "axios";
import { normalize } from "normalizr";

import { ordenEntity } from "../schemas";
import { addNewTareaProceso } from "../actions";

const ordenesAdapter = createEntityAdapter();

const initialState = ordenesAdapter.getInitialState({
  status: "idle",
  error: null
});

// const sortTareas = tareasProceso => {
//   const sortedTareas = [];
//   const map = new Map();

//   let idTarea = null;
//   tareasProceso.forEach((tarea, i) => {
//     if (tarea.idTareaAntecesora === null) {
//       idTarea = tarea.idTarea;
//       sortedTareas.push(tarea);
//     } else {
//       map.set(tarea.idTareaAntecesora, i);
//     }
//   });

//   while (sortedTareas.length < tareasProceso.length) {
//     let nextTarea = tareasProceso[map.get(idTarea)];
//     sortedTareas.push(nextTarea);
//     idTarea = nextTarea.idTarea;
//   }

//   return sortedTareas;
// };

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
    return response.data.payload;
  }
);

// export const updateOrden = createAsyncThunk(
//   "ordenes/updateOrden",
//   async orden => {
//     const { id, producto } = orden;
//     const response = await axios.put(
//       `https://daprolac.herokuapp.com/api/v1/ordenes/${id}`,
//       { producto }
//     );
//     return response.data.payload;
//   }
// );

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
  reducers: {
    ordenActualizada(state, action) {
      const { id, producto } = action.payload;
      const procesoExistente = state.entities[id];
      if (procesoExistente) {
        procesoExistente.producto = producto;
      }
    }
  },
  extraReducers: {
    [fetchOrdenes.pending]: state => {
      state.status = "loading";
    },
    [fetchOrdenes.fulfilled]: (state, action) => {
      state.status = "succeeded";
      ordenesAdapter.upsertMany(state, action.payload.ordenes);
    },
    [fetchOrdenes.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [addNewOrden.fulfilled]: ordenesAdapter.addOne,
    // [updateOrden.fulfilled]: (state, action) => {
    //   const { id, producto } = action.payload;
    //   ordenesAdapter.updateOne(state, { id, changes: { producto } });
    // },
    [deleteOrden.fulfilled]: (state, action) => {
      ordenesAdapter.removeOne(state, action.payload.id);
    }
    // [addNewTareaProceso.fulfilled]: (state, action) => {
    //   const { id, idOrden } = action.payload;
    //   state.entities[idOrden].tareas.push(id);
    // }
  }
});

export const { ordenActualizada } = slice.actions;

export const {
  selectAll: selectAllOrdenes,
  selectById: selectOrdenById,
  selectIds: selectOrdenIds
} = ordenesAdapter.getSelectors(state => state.ordenes);

//   export const selectTareasByProcesoId = (idOrden) =>
//       createSelector(
//         [
//           (state) => selectOrdenById(state, idOrden),
//           (state) => state.tareas.ids.map((id) => state.tareas.entities[id]),
//           (state) => state.procesosTareas.ids.map((id) => state.procesosTareas.entities[id]),
//           (state) => state.datos.ids.map((id) => state.datos.entities[id])
//         ],
//         (proceso, tareas, tareasProceso, datos) => {
//           let tareasProc = tareasProceso.filter(tarea => parseInt(tarea.idOrden) === parseInt(idOrden));
//           tareasProc = sortTareas(tareasProc);

//           const mapTareasProc = {}
//           tareasProc.forEach((tareaProc, index) => mapTareasProc[tareaProc.idTarea] = index);

//           const tareasComplete = [];
//           const tareasU = tareas.filter((tarea) => proceso.tareas.includes(tarea.id));
//           tareasU.forEach( tarea => {
//             const idxOrder = mapTareasProc[tarea.id];
//             const tareaOrder = { ...tarea, proceso_tarea: tareasProc[idxOrder] };

//             if (tareaOrder.datos && tareaOrder.datos.length) {
//               tareaOrder.datos = datos.filter( dato => tareaOrder.datos.includes(dato.id));
//             }

//             tareasComplete[idxOrder] = tareaOrder;
//           });

//           return tareasComplete;
//         }
//       );

export default slice.reducer;
