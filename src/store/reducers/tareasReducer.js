import { EDIT_TAREA } from "../types/tareasTypes";

const INITIAL_STATE = {
  tarea: {}
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EDIT_TAREA:
      return {
        ...state,
        tarea: { ...state.tarea, ...action.payload.tarea },
      }

    default: return state
  }
}
