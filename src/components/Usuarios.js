import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getUsuarios } from '../store/actions/usuariosAction';

import Spinner from './utils/Spinner';
import Error from './utils/Error'
import UsuariosTabla from './UsuariosTabla';

class Usuarios extends Component {

  componentDidMount() {
    if (!this.props.usuarios.length) {
      this.props.getUsuarios();
    }
  }

  cargarContenido = () => {
    if (this.props.loading) {
      return <Spinner />;
    }

    if (this.props.error) {
      return <Error mensaje = { this.props.error } />;
    }

    return <UsuariosTabla />;
  }

  render() {
    return (
      <div>
        { this.cargarContenido() }
      </div>
    )
  }
};

const mapStateToProps = (reducers) => {
  return {
    error: reducers.globalReducer.error,
    loading: reducers.globalReducer.loading,
    usuarios: reducers.usuariosReducer.usuarios
  };
}
const mapDispatchToProps = { getUsuarios };

export default connect(mapStateToProps, mapDispatchToProps)(Usuarios);
