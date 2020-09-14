import { combineReducers } from 'redux';

import usuariosReducer from './usuariosReducer';
import procesosReducer from './procesosReducer';
import globalReducer from "./globalReducer";

export default combineReducers({
  procesosReducer,
  globalReducer,
  usuariosReducer
});
