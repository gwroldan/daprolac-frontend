import { combineReducers } from 'redux';

import usuariosReducer from './usuariosReducer';
import procesosReducer from './procesosReducer';
import tareasReducer from './tareasReducer';
import globalReducer from "./globalReducer";

export default combineReducers({
  globalReducer,
  usuariosReducer,
  procesosReducer,
  tareasReducer
});
