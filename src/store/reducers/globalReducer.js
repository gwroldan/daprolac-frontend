import { ERROR, LOADING, TOGGLE_DARK_MODE } from "../types";

const INITIAL_STATE = {
  darkMode: false,
  loading: false,
  error: ''
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_DARK_MODE: return { ...state, darkMode: !state.darkMode }
    case LOADING: return { ...state, loading: action.payload }
    case ERROR: return { ...state, error: action.payload };
    default: return state;
  }
}
