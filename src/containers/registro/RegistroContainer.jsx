import React, { useState } from 'react';

import { connect } from 'react-redux';
import { registerRequest } from "../../store/actions/usuariosAction";

import { Button } from "@material-ui/core";

const RegistroContainer = props => {
  const [form, setValues] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: ''
  });

  const handleInput = event => {
    setValues({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  const handleSubmit = event => {
    event.preventDefault();
    props.registerRequest(form);
  }

  return (
      <div>
        <h2>Registrate</h2>
        <form>
          <input
              name="nombre"
              type="text"
              placeholder="nombre"
              onChange={handleInput}
          />
          <input
              name="apellido"
              type="text"
              placeholder="apellido"
              onChange={handleInput}
          />
          <input
              name="email"
              type="email"
              placeholder="example@example.com"
              onChange={handleInput}
          />
          <input
              name="remail"
              type="email"
              placeholder="Repetir email"
              onChange={handleInput}
          />
          <input
              name="password"
              type="password"
              minLength="8"
              onChange={handleInput}
          />
          <input
              name="rpassword"
              type="password"
              minLength="8"
              onChange={handleInput}
          />
          <Button color="primary" variant="contained" onClick = { handleSubmit } >
            Registrarse
          </Button>

        </form>
      </div>
  );
}

const mapDispatchToProps = { registerRequest }

export default connect(null, mapDispatchToProps)(RegistroContainer);
