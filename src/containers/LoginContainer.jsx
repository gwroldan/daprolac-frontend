import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { connect } from 'react-redux';
import { login, logout } from '../store/actions/usuariosAction';

import Login from '../components/registro/Login';

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.props.logout();

    this.state = {
      isSubmitted: false
    }
  }

  handleSubmit = (values) => {
    this.setState({
      ...this.state,
      isSubmitted: true
    });

    const { email, password } = values;
    this.props.login(email, password);

    if (this.props.logginIn) {
      this.props.history.push("/");
    }
  }

  render() {
    const values = {
      email: '',
      password: '',
    };

    const schema = {
      email: Yup.string()
          .email('Correo electronico invalido')
          .required('Ingresar email'),
      password: Yup.string()
          .required('Ingresar contraseña'),
    };

    console.log(this.state);

    return (
      <Formik
        initialValues = { values }
        validationSchema = { Yup.object(schema) }
        onSubmit = { this.handleSubmit }
      >

        { formik => {
          return (
              <Login formik = { formik } error = { (this.state.isSubmitted && !this.props.logginIn) } />
          )
        }}
      </Formik>
    );
  }
}

const mapStateToProps = (state) => {
  const { loggingIn } = state.usuariosReducer;
  return { loggingIn };
}

const mapDispatchToProps = {
  login,
  logout
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
