import { combineReducers } from 'redux';

import usuariosReducer from './usuariosSlice';
import procesosReducer from './procesosSlice';
import tareasReducer from "./tareasSlice";
import datosReducer from './datosSlice';
import procesosTareasReducer from './procesosTareasSlice';
import tareasDatosReducer from './tareasDatosSlice';

export default combineReducers({
  usuarios: usuariosReducer,
  procesos: procesosReducer,
  tareas: tareasReducer,
  datos: datosReducer,
  procesosTareas: procesosTareasReducer,
  tareasDatos: tareasDatosReducer
});
