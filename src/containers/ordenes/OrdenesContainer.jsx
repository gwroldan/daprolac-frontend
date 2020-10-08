import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchOrdenes,
  addNewOrden,
  deleteOrden,
  selectAllOrdenes
} from "../../store/reducers/ordenesSlice";

import { Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

import { withTheme } from "@material-ui/core/styles";

import Spinner from "../../components/utils/Spinner";
import Error from "../../components/utils/Error";
import Ordenes from "../../components/ordenes/Ordenes";

const OrdenesContainer = props => {
  const dispatch = useDispatch();
  const ordenes = useSelector(selectAllOrdenes);

  const postStatus = useSelector(state => state.ordenes.status);
  const error = useSelector(state => state.ordenes.error);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchOrdenes());
    }
  }, [postStatus, dispatch]);

  const crearOrden = async (orden, { resetForm }) => {
    dispatch(addNewOrden(orden));

    if (!error) {
      await Swal.fire("Se agregó la orden", "", "success");
      resetForm({ values: "" });
    } else {
      await Swal.fire("Hubo un error", this.props.error, "error");
    }
  };

  const borrarOrden = async idOrden => {
    const result = await Swal.fire({
      title: "¿Seguro desea eliminar la orden?",
      text: "No hay vuelta atras!",
      icon: "question",
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "No, Cancelar",
      showCancelButton: true,
      confirmButtonColor: props.theme.palette.secondary.dark,
      cancelButtonColor: props.theme.palette.error.dark
    });

    if (result.value) {
      await dispatch(deleteOrden(idOrden));

      if (!error) {
        await Swal.fire("Orden eliminada", "", "success");
      } else {
        await Swal.fire("Hubo un error", error, "error");
      }
    }
  };

  if (postStatus === "loading") {
    return <Spinner />;
  }
  if (postStatus === "failed") {
    return <Error mensaje={error} />;
  }

  return (
    <React.Fragment>
      {/* <Formik
        initialValues={{ producto: "" }}
        validationSchema={Yup.object({
          producto: Yup.string().required("Debe ingresar el nombre del proceso")
        })}
        onSubmit={crearOrden}
      >
        {formik => (
          <Ordenes
            formik={formik}
            ordenes={ordenes}
            borrarOrden={borrarOrden}
          />
        )}
      </Formik> */}

      <Ordenes ordenes={ordenes} borrarOrden={borrarOrden} />
    </React.Fragment>
  );
};

export default withTheme(OrdenesContainer);
