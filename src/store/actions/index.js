import { ERROR, LOADING, TOGGLE_DARK_MODE } from "../types";

export const isLoading = (value) => (
    {
      type: LOADING,
      payload: value
    }
)

export const isError = (error) => {
  console.log('Error: ', error.message);

  return {
    type: ERROR,
    payload: 'Algo salio mal, intente mas tarde.'
  }
}

export const toggleDarkMode = () => (dispatch) => {
  dispatch({
    type: TOGGLE_DARK_MODE
  });
}


