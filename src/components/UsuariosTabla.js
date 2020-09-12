import React from 'react'
import { connect } from 'react-redux';

const UsuariosTabla = (props) => {

  const cargarFilas = () => props.usuarios.map((usuario) => (
      <tr key={ usuario.id }>
        <td>{ usuario.nombre }</td>
        <td>{ usuario.email }</td>
        <td>{ usuario.tipo }</td>
      </tr>
  ));

  return (
    <table className="tabla">
      <thead>
      <tr>
        <th>Nombre</th>
        <th>Correo</th>
        <th>Enlace</th>
      </tr>
      </thead>
      <tbody>
        { cargarFilas() }
      </tbody>
    </table>
  )
}

const mapStateToProps = (reducers) => reducers.usuariosReducer;

export default connect(mapStateToProps)(UsuariosTabla);
