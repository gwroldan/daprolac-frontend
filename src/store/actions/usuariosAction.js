import axios from 'axios';
import {
  REGISTER_REQUEST,
  LOGIN_REQUEST,
  GET_USUARIOS
} from '../types/usuariosTypes';

import { isLoading, isError } from "./index";

export const getUsuarios = () => async (dispatch) => {
  dispatch(isLoading(true));

  try{
    const response = await axios.get('https://daprolac.herokuapp.com/api/v1/usuarios');
    dispatch(isLoading(false));

    dispatch({
      type: GET_USUARIOS,
      payload: response.data.payload
    });
  } catch (err) {
    dispatch(isLoading(false));
    dispatch(isError(err));
  }
}

export const login = (email, clave) => async (dispatch) => {
  dispatch(isLoading(true));

  try{
    const response = await axios.post('https://daprolac.herokuapp.com/api/v1/usuarios/login',{email, clave});
    dispatch(isLoading(false));

    dispatch({
      type: LOGIN_REQUEST,
      payload: {
        usuario: { email },
        logginIn: response.data.payload.auth
      }
    });
  } catch (err) {
    dispatch(isLoading(false));
    dispatch(isError(err));
  }
}

export const logout = () => async (dispatch) => {
  dispatch(isLoading(true));

  try{
    const response = await axios.get('https://daprolac.herokuapp.com/api/v1/usuarios');
    dispatch(isLoading(false));

    dispatch({
      type: GET_USUARIOS,
      payload: response.data.payload
    });
  } catch (err) {
    dispatch(isLoading(false));
    dispatch(isError(err));
  }
}

export const registerRequest = (payload) => (dispatch) => {
  dispatch({
    type: REGISTER_REQUEST,
    payload
  });
}
