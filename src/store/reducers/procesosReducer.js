import {
  GET_PROCESO,
  GET_PROCESOS,
  CREATE_PROCESO,
  EDIT_PROCESO,
  DELETE_PROCESO } from '../types/procesosTypes';

import { EDIT_TAREA } from '../types/tareasTypes';

const INITIAL_STATE = {
  proceso: {},
  procesos: []
}

const sortTareas = (tareas) => {
  const sortedTareas = [];
  const map = new Map();

  let idTarea = null;
  tareas.forEach((tarea, i) => {
    if (tarea.proceso_tarea.idTareaAntecesora === null) {
      idTarea = tarea.id
      sortedTareas.push(tarea);
    } else {
      map.set(tarea.proceso_tarea.idTareaAntecesora, i);
    }
  });

  while (sortedTareas.length < tareas.length) {
    let nextTarea = tareas[map.get(idTarea)];
    sortedTareas.push(nextTarea);
    idTarea = nextTarea.id;
  }

  return sortedTareas;
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PROCESO:
      const tareas = { tareas: sortTareas(action.payload.proceso.tareas) }

      return {
        ...state,
        proceso: { ...action.payload.proceso, ...tareas } ,
        procesos: [
          ...state.procesos.filter( proceso => proceso.id !== parseInt(action.payload.proceso.id) ),
          { ...action.payload.proceso, ...tareas }
        ]
      };

    case GET_PROCESOS:
      return {
        ...state,
        procesos: action.payload.procesos,
      };

    case CREATE_PROCESO:
      return {
        ...state,
        procesos: [ ...state.procesos, action.payload.proceso ]
      }

    case EDIT_PROCESO:
      const newProcesos = state.procesos.filter( proceso => proceso.id !== parseInt(action.payload.id) );
      const editProceso = { ...state.proceso, ...action.payload.proceso }

      return {
        ...state,
        proceso: editProceso,
        procesos: [ ...newProcesos, editProceso ]
      }

    case DELETE_PROCESO:
      return {
        ...state,
        procesos: state.procesos.filter( proceso => proceso.id !== action.payload.id )
      }

    case EDIT_TAREA:
      return {
        ...state,
        tarea: { ...state.tarea, ...action.payload.tarea },
      }

    default: return state
  }
}
