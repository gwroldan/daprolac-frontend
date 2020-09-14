import axios from 'axios';
import {
  GET_PROCESO,
  GET_PROCESOS,
  CREATE_PROCESO,
  EDIT_PROCESO,
  DELETE_PROCESO
} from '../types/procesosTypes';

import { isLoading, isError } from "./index";

export const getProcesos = () => async (dispatch) => {
  dispatch(isLoading(true));

  try{
    const response = await axios.get('https://daprolac.herokuapp.com/api/v1/procesos');
    dispatch(isLoading(false));

    dispatch({
      type: GET_PROCESOS,
      payload: {
        procesos: response.data.payload,
      }
    });
  } catch (err) {
    dispatch(isLoading(false));
    dispatch(isError(err));
  }
}

export const getProceso = (idProceso) => async (dispatch) => {
  dispatch(isLoading(true));

  try{
    const response = await axios.get(`https://daprolac.herokuapp.com/api/v1/procesos/${idProceso}?eager=1`);
    dispatch(isLoading(false));

    dispatch({
      type: GET_PROCESO,
      payload: {
        proceso: response.data.payload.pop(),
      }
    });
  } catch (err) {
    dispatch(isLoading(false));
    dispatch(isError(err));
  }
}

export const crearProceso = (proceso) => async (dispatch) => {
  dispatch(isLoading(true));

  try {
    const response = await axios.post('https://daprolac.herokuapp.com/api/v1/procesos?eager=1', proceso);
    dispatch(isLoading(false));

    dispatch({
      type: CREATE_PROCESO,
      payload: {
        proceso: response.data.payload
      }
    });
  } catch (err) {
    dispatch(isLoading(false));
    dispatch(isError(err));
  }
}

export const editarProceso = (idProceso, proceso) => async (dispatch) => {
  dispatch(isLoading(true));

  try{
    const response = await axios.put(`https://daprolac.herokuapp.com/api/v1/procesos/${proceso.id}`, proceso);
    dispatch(isLoading(false));

    dispatch({
      type: EDIT_PROCESO,
      payload: {
        id: parseInt(response.data.payload.id),
        proceso: proceso
      }
    });
  } catch (err) {
    dispatch(isLoading(false));
    dispatch(isError(err));
  }
}

export const borrarProceso = (idProceso) => async (dispatch) => {
  dispatch(isLoading(true));

  try{
    const response = await axios.delete(`https://daprolac.herokuapp.com/api/v1/procesos/${idProceso}`);
    dispatch(isLoading(false));

    dispatch({
      type: DELETE_PROCESO,
      payload: {
        id: parseInt(response.data.payload.id)
      }
    });
  } catch (err) {
    dispatch(isLoading(false));
    dispatch(isError(err));
  }
}
