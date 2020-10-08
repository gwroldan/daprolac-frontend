import React from "react";
import { useSelector, useDispatch } from "react-redux";

import OrdenDetalle from "../../components/ordenes/OrdenDetalle";
import {
  selectTareasByProcesoId,
  selectProcesoById,
  updateProceso
} from "../../store/reducers/procesosSlice";
//import { updateTarea } from "../../store/reducers/tareasSlice";
//import { addNewTareaProceso } from "../../store/actions/index";

import { selectOrdenById } from "../../store/reducers/ordenesSlice";

const OrdenDetalleContainer = props => {
  const dispatch = useDispatch();

  const ordenId = props.match.params.id;
  //const procesoId = props.match.params.idProceso;
  //const proceso = useSelector(state => selectProcesoById(state, procesoId));

  //const tareas = useSelector(selectTareasByProcesoId(procesoId));

  const orden = useSelector(state => selectOrdenById(state, ordenId));

  // const editarProceso = async proceso => await dispatch(updateProceso(proceso));
  // const editarTarea = async tarea => await dispatch(updateTarea(tarea));
  // const agregarNuevaTareaProceso = tarea => dispatch(addNewTareaProceso(tarea));

  return (
    <OrdenDetalle
      orden={orden}
      //proceso={proceso}
      //tareas={tareas}
    />
  );
};

export default OrdenDetalleContainer;
