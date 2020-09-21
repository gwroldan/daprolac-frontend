import axios from "axios";
import { EDIT_TAREA } from "../types/tareasTypes";
import { isError } from "./index";

export const editarTarea = (idTarea, tarea) => async (dispatch) => {
  try{
    const response = await axios.put(`https://daprolac.herokuapp.com/api/v1/tareas/${idTarea}`, tarea);

    dispatch({
      type: EDIT_TAREA,
      payload: {
        id: parseInt(response.data.payload.id),
        tarea: tarea
      }
    });
  } catch (err) {
    dispatch(isError(err));
  }
}
