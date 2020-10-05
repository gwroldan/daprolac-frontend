import React from "react";
import { useSelector, useDispatch } from "react-redux";

import ProcesoDetalle from "../../components/procesos/ProcesoDetalle";
import {
  selectTareasByProcesoId,
  selectProcesoById,
  updateProceso } from '../../store/reducers/procesosSlice';
import { updateTarea } from '../../store/reducers/tareasSlice';
import { addNewTareaProceso } from '../../store/actions/index';

const ProcesoDetalleContainer = (props) => {
  const dispatch = useDispatch();

  const procesoId = props.match.params.id;
  const proceso = useSelector(state => selectProcesoById(state, procesoId));
  const tareas = useSelector(selectTareasByProcesoId(procesoId));

  const editarProceso = async (proceso) => await dispatch(updateProceso(proceso));
  const editarTarea = async (tarea) => await dispatch(updateTarea(tarea));
  const agregarNuevaTareaProceso = (tarea) => dispatch(addNewTareaProceso(tarea));

  return (
    <ProcesoDetalle
      proceso = { proceso }
      tareas = { tareas }
      editarProceso = { editarProceso }
      editarTarea = { editarTarea }
      addNewTareaProceso = { agregarNuevaTareaProceso }
    />
  );
}

export default ProcesoDetalleContainer;
