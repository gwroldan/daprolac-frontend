import React, { Component} from "react";
import { connect } from "react-redux";

import Spinner from "../../components/utils/Spinner";
import Error from "../../components/utils/Error";
import ProcesoDetalle from "../../components/procesos/ProcesoDetalle";
import { getProceso, editarProceso } from "../../store/actions/procesosAction";
import { editarTarea } from "../../store/actions/tareasActions";

class ProcesoDetalleContainer extends Component {
  async componentDidMount() {
    await this.props.getProceso(this.props.match.params.id);
  }

  render() {
    if (this.props.loading || !Object.keys(this.props.proceso).length) {
      return <Spinner />
    }

    if (this.props.error) {
      return <Error mensaje = { this.props.error } />;
    }

    return (
      <ProcesoDetalle
        proceso = { this.props.proceso }
        editarProceso = { this.props.editarProceso }
        editarTarea = { this.props.editarTarea }
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { proceso } = state.procesosReducer;
  const { loading, error } = state.globalReducer;

  return {
    proceso,
    loading,
    error
  };
}

const mapDispatchToProps = {
  getProceso,
  editarProceso,
  editarTarea
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcesoDetalleContainer);
