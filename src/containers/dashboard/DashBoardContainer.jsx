import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

import DashBoard from "../../components/dashboard/DashBoard";
import Spinner from "../../components/utils/Spinner";
import Error from "../../components/utils/Error";

import { selectAllOrdenes, selectOrdenesFinalizadas } from "../../store/reducers/ordenesSlice";
import { selectAllProcesosTareas } from "../../store/reducers/tareasOrdenesSlice";
import { fetchProcesos } from "../../store/reducers/procesosSlice";

const DashBoardContainer = props => {
  const dispatch = useDispatch();
  const ordenes = useSelector(selectAllOrdenes);
  const ordenesFinalizadas = useSelector(selectOrdenesFinalizadas);
  const tareas = useSelector(selectAllProcesosTareas);

  const postStatus = useSelector((state) => state.procesos.status);
  const error = useSelector((state) => state.procesos.error);

  const ordenesPorEstado = [
    { name: "Terminadas", value: ordenesFinalizadas.length, color: "success" },
    { name: "Pendientes", value: ordenes.length - ordenesFinalizadas.length, color: "error" },
    { name: "Sin empezar", value: 0, color: "warning" },
  ];

  const tareasPorEstado = [
    { name: "Terminadas", value: 20, color: "success" },
    { name: "Pendientes", value: 10, color: "error" },
    { name: "Sin empezar", value: 20, color: "warning" },
  ];

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchProcesos());
    }
  }, [postStatus, dispatch]);

  if (postStatus === 'loading') {
    return <Spinner />;
  }
  if (postStatus === 'failed') {
    return <Error mensaje = { error } />;
  }

  return (
    <DashBoard
        cantOrdenes = { ordenes.length }
        cantTareas = { tareas.length }
        ordenesPorEstado = { ordenesPorEstado }
        tareasPorEstado = { tareasPorEstado }
    />
  );
};

export default DashBoardContainer;
