import {
  REGISTER_REQUEST,
  LOGIN_REQUEST,
  GET_USUARIOS
} from '../types/usuariosTypes';
import {GET_PROCESOS} from "../types/procesosTypes";

const INITIAL_STATE = {
  usuario: {},
  logginIn: false,
  usuarios: [],
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        usuario: action.payload,
      };

    case LOGIN_REQUEST:
      return {
        ...state,
        usuario: action.payload.logginIn ? action.payload.usuario : {},
        logginIn: action.payload.logginIn
      };

    case GET_USUARIOS:
      return {
        ...state,
        usuarios: action.payload,
      };

    default: return state
  }
}
