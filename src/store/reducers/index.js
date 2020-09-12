import { combineReducers } from 'redux';

import usuariosReducer from './usuariosReducer';
import globalReducer from "./globalReducer";

export default combineReducers({
  usuariosReducer,
  globalReducer
});
