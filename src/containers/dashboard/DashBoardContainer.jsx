import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

import DashBoard from "../../components/dashboard/DashBoard";
import Spinner from "../../components/utils/Spinner";
import Error from "../../components/utils/Error";

import {
  fetchOrdenes,
  selectAllOrdenes,
  selectOrdenesFinalizadas
} from "../../store/reducers/ordenesSlice";

import {
  selectAllTareasOrdenes,
  selectOrdenesSinComenzar,
  selectTareasOrdenesSinComenzar,
  selectTareasOrdenesFinalizadas
} from "../../store/reducers/tareasOrdenesSlice";

const DashBoardContainer = props => {
  const dispatch = useDispatch();
  const cantOrdenes = useSelector(selectAllOrdenes).length;
  const cantOrdenesFinalizadas = useSelector(selectOrdenesFinalizadas).length;
  const cantOrdenesSinComenzar = useSelector(selectOrdenesSinComenzar()).length;

  const ordenesPorEstado = [
    { name: "Terminadas", value: cantOrdenesFinalizadas, color: "success" },
    { name: "Pendientes", value: cantOrdenes - cantOrdenesFinalizadas - cantOrdenesSinComenzar, color: "error" },
    { name: "Sin empezar", value: cantOrdenesSinComenzar, color: "warning" },
  ];

  //{ nombre: "orden 1", tareas: 10, porcentaje: 13, fecha_estimada: "24-2-1", estado:"pendiente", color:"#e60000"},

  const analisisOrdenes = [
    { nombre: "orden 1", tareas: 10, porcentaje: 13, fecha_estimada: "24-2-1", estado:"pendiente", color: "#e60000"},
    { nombre: "orden 2", tareas: 200, porcentaje: 100, fecha_estimada: 24, estado:"completado" , color:"#00b33c"},
    { nombre: "orden 3", tareas: 200, porcentaje: 50, fecha_estimada: 24, estado:"pendiente" , color: "#e60000"},
    { nombre: "orden 4", tareas: 200, porcentaje: 6.0, fecha_estimada: 24, estado:"pendiente", color: "#e60000"},
    { nombre: "orden 5", tareas: 200, porcentaje: 6.0, fecha_estimada: 24, estado:"pendiente", color: "#e60000"},
    { nombre: "orden 6", tareas: 200, porcentaje: 0, fecha_estimada: 24, estado:"sin empezar", color: "#ffcc00"}
  ];

  const cantTareas = useSelector(selectAllTareasOrdenes).length;
  const cantTareasFinalizadas = useSelector(selectTareasOrdenesFinalizadas()).length;
  const cantTareasSinComenzar = useSelector(selectTareasOrdenesSinComenzar()).length;

  const tareasPorEstado = [
    { name: "Terminadas", value: cantTareasFinalizadas, color: "success" },
    { name: "Pendientes", value: cantTareas - cantTareasFinalizadas - cantTareasSinComenzar, color: "error" },
    { name: "Sin empezar", value: cantTareasSinComenzar, color: "warning" },
  ];

  const postStatus = useSelector((state) => state.procesos.status);
  const error = useSelector((state) => state.procesos.error);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchOrdenes());
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
        cantOrdenes = { cantOrdenes }
        cantTareas = { cantTareas }
        ordenesPorEstado = { ordenesPorEstado }
        tareasPorEstado = { tareasPorEstado }
        analisisOrdenes = { analisisOrdenes }
    />
  );
};

export default DashBoardContainer;
