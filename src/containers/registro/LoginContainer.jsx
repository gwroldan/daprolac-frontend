import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { connect } from 'react-redux';
import { login, logout } from '../../store/actions/usuariosAction';

import Login from '../../components/registro/Login';
import Spinner from "../../components/utils/Spinner";
import Error from "../../components/utils/Error";

class LoginContainer extends Component {
  constructor(props) {
    super(props);

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

    if (this.props.loading) {
      return <Spinner />
    }

    if (this.props.error) {
      return <Error mensaje = { this.props.error } />;
    }

    if (this.props.logginIn) {
      return <Redirect to = "/procesos" />
    }

    return (
      <Formik
        initialValues = { values }
        validationSchema = { Yup.object(schema) }
        onSubmit = { this.handleSubmit }
      >
        {
          formik => (
            <Login
              formik = { formik }
              error = { (this.state.isSubmitted && !this.props.logginIn) }
            />
          )
        }
      </Formik>
    );
  }
}

const mapStateToProps = (state) => {
  const { loggingIn } = state.usuariosReducer;
  const { loading, error } = state.globalReducer;

  return {
    loggingIn,
    loading,
    error
  };
}

const mapDispatchToProps = {
  login,
  logout
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
