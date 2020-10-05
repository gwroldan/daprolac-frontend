import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchUsuarios, selectAllUsarios } from '../store/reducers/usuariosSlice';

import Spinner from './utils/Spinner';
import Error from './utils/Error'
import UsuariosTabla from './UsuariosTabla';

const Usuarios = () => {
  const dispatch = useDispatch();
  const usuarios = useSelector(selectAllUsarios);

  const postStatus = useSelector((state) => state.usuarios.status);
  const error = useSelector((state) => state.usuarios.error);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchUsuarios());
    }
  }, [postStatus, dispatch]);

  if (postStatus === 'loading') {
    return <Spinner />;
  }
  if (postStatus === 'failed') {
    return <Error mensaje = { error } />;
  }

  return <UsuariosTabla usuarios = { usuarios } />;
};

export default Usuarios;
