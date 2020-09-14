import React, { Component } from "react";
import { connect } from "react-redux";

import { Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

import { withTheme } from "@material-ui/core/styles";

import Spinner from "../../components/utils/Spinner";
import Error from "../../components/utils/Error";
import Procesos from '../../components/procesos/Procesos';
import { getProcesos, crearProceso, borrarProceso } from '../../store/actions/procesosAction';

class ProcesosContainer extends Component {

  componentDidMount() {
    this.props.getProcesos();
  }

  crearProceso = async (values) => {
    await this.props.crearProceso(values);

    if (!this.props.error) {
      Swal.fire('Se agregó el proceso', '', 'success');
    } else {
      Swal.fire('Hubo un error', this.props.error, 'error');
    }
  }

  borrarProceso = async (idProceso) => {

    const result = await Swal.fire({
        title: "¿Seguro desea eliminar el proceso?",
        text: "No hay vuelta atras!",
        icon: 'question',
        confirmButtonText: "Si, Eliminar",
        cancelButtonText: "No, Cancelar",
        showCancelButton: true,
        confirmButtonColor: this.props.theme.palette.secondary.dark,
        cancelButtonColor: this.props.theme.palette.error.dark
      });

    if (result.value) {
      await this.props.borrarProceso(idProceso);

      if (!this.props.error) {
        Swal.fire('Proceso eliminado', '', 'success');
      } else {
        Swal.fire('Hubo un error', this.props.error, 'error');
      }
    }
  }

  render() {
    const values = { producto: '' };
    const schema = {
      producto: Yup.string()
          .required('Debe ingresar el nombre del proceso')
    };

    if (this.props.loading) {
      return <Spinner />
    }

    if (this.props.error) {
      return <Error mensaje = { this.props.error } />;
    }

    return (
      <Formik
        initialValues = { values }
        validationSchema = { Yup.object(schema) }
        onSubmit = { this.crearProceso }
      >
        {
          formik => (
            <Procesos
              formik = { formik }
              procesos = { this.props.procesos }
              borrarProceso = { this.borrarProceso }
            />
          )
        }
      </Formik>
    );
  }
}

const mapStateToProps = (state) => {
  const { procesos } = state.procesosReducer;
  const { loading, error } = state.globalReducer;

  return {
    procesos,
    loading,
    error
  };
}

const mapDispatchToProps = {
  getProcesos,
  crearProceso,
  borrarProceso
}

export default withTheme(connect(mapStateToProps, mapDispatchToProps)(ProcesosContainer));
