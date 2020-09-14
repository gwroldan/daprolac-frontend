import {
  GET_PROCESO,
  GET_PROCESOS,
  CREATE_PROCESO,
  EDIT_PROCESO,
  DELETE_PROCESO } from '../types/procesosTypes';

const INITIAL_STATE = {
  proceso: {},
  procesos: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PROCESO:
      return {
        ...state,
        proceso: action.payload.proceso,
        procesos: [
          ...state.procesos.filter( proceso => proceso.id !== parseInt(action.payload.proceso.id) ),
          action.payload.proceso
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
      return {
        ...state,
        procesos: [
          ...state.procesos.filter( proceso => proceso.id !== action.payload.id ),
          action.payload.proceso
        ]
      }

    case DELETE_PROCESO:
      return {
        ...state,
        procesos: state.procesos.filter( proceso => proceso.id !== action.payload.id )
      }

    default: return state
  }
}
