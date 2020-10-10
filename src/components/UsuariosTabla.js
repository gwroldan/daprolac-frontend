import React from 'react'

const UsuariosTabla = (props) => {

  const cargarFilas = () => props.usuarios.map((usuario) => (
      <tr key={ usuario.id }>
        <td>{ usuario.nombre }</td>
        <td>{ usuario.apellido }</td>
        <td>{ usuario.email }</td>
        <td>{ parseInt(usuario.tipo.toString()) === 0 ? 'Administrador' : 'Operario' }</td>
      </tr>
  ));

  return (
    <table className="tabla">
      <thead>
      <tr>
        <th>Nombre</th>
        <th>Apellido</th>
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

export default UsuariosTabla;
