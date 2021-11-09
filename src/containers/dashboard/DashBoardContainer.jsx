import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

import DashBoard from "../../components/dashboard/DashBoard";
import Spinner from "../../components/utils/Spinner";
import Error from "../../components/utils/Error";

import {
  fetchOrdenes,
  selectAllOrdenes,
  selectOrdenesSinComenzar,
  selectOrdenesFinalizadas,
  selectOrdenesWithNested,
} from "../../store/reducers/ordenesSlice";

import {
  selectAllTareasOrdenes,
  selectTareasOrdenesSinComenzar,
  selectTareasOrdenesFinalizadas
} from "../../store/reducers/tareasOrdenesSlice";

import {
  fetchUsuarios,
  selectAllUsarios
} from "../../store/reducers/usuariosSlice";

import { selectAllTareas } from "../../store/reducers/tareasSlice"
import {fetchProcesos} from "../../store/reducers/procesosSlice";


const DashBoardContainer = props => {
  const dispatch = useDispatch();
  const cantOrdenes = useSelector(selectAllOrdenes).length;
  const ordenesFinalizadas = useSelector(selectOrdenesFinalizadas)
  const cantOrdenesFinalizadas = ordenesFinalizadas.length;
  const ordenesSinComenzar = useSelector(selectOrdenesSinComenzar)
  const cantOrdenesSinComenzar = ordenesSinComenzar.length;
  const ordenes = useSelector(selectOrdenesWithNested);
  const usuarios = useSelector(selectAllUsarios);

  const ordenesPorEstado = [
    { name: "Terminadas", value: cantOrdenesFinalizadas, color: "success" },
    { name: "Pendientes", value: cantOrdenes - cantOrdenesFinalizadas - cantOrdenesSinComenzar, color: "error" },
    { name: "Sin empezar", value: cantOrdenesSinComenzar, color: "warning" },
  ];

  const cantTareas = useSelector(selectAllTareasOrdenes).length;
  const cantTareasFinalizadas = useSelector(selectTareasOrdenesFinalizadas).length;
  const cantTareasSinComenzar = useSelector(selectTareasOrdenesSinComenzar).length;

  const tareasPorEstado = [
    { name: "Terminadas", value: cantTareasFinalizadas, color: "success" },
    { name: "Pendientes", value: cantTareas - cantTareasFinalizadas - cantTareasSinComenzar, color: "error" },
    { name: "Sin empezar", value: cantTareasSinComenzar, color: "warning" },
  ];

  // Tareas por Usuario
  function usuariosTareas(ordenes) {
    const usuarioTareas = [];

    ordenes.map(orden => {
      orden.tareas.map(tarea => {
        let tCompletadas = 0
        let tPendientes = 0
        let tSinEmpezar = 0

        if (tarea.fechaInicia != null && tarea.fechaFin != null) tCompletadas++;
        if (tarea.fechaInicia != null && tarea.fechaFin == null) tPendientes++;
        if (tarea.fechaInicia == null && tarea.fechaFin == null) tSinEmpezar++;

        let indice = tarea.usuario ?
            usuarioTareas.findIndex( uTarea => uTarea.idUsuario == tarea.idUsuario) :
            usuarioTareas.findIndex( uTarea => uTarea.idUsuario == 0)

        if (indice != -1) {
          if (tarea.fechaInicia != null && tarea.fechaFin != null) usuarioTareas[indice].completadas++;
          if (tarea.fechaInicia != null && tarea.fechaFin == null) usuarioTareas[indice].pendientes++;
          if (tarea.fechaInicia == null && tarea.fechaFin == null) usuarioTareas[indice].sinEmpezar++;
        } else {
          usuarioTareas.push({
            name: tarea.usuario ? tarea.usuario.nombre + " " + tarea.usuario.apellido : "Sin Asignar",
            idUsuario: tarea.usuario ? tarea.idUsuario : 0,
            completadas: tCompletadas,
            pendientes: tPendientes,
            sinEmpezar: tSinEmpezar
          });
        }
      });
    });

    return usuarioTareas;
  }
  const usuarioTareasComponente = usuariosTareas(ordenes);
  console.log("USUARIO TAREAS:", usuarioTareasComponente)

  // Tareas Calendario
  function ordenesCalendarioFiltradas(ordenes){
    const tareasCalendario = [];
    let id = 0;

    ordenes.map(orden => {
      orden.tareas.map(tarea => {
        if (tarea.fechaInicia != null && tarea.fechaFin == null) {
          tareasCalendario.push({
            id: id++,
            idTarea: tarea.idTarea,
            idUsuario: tarea.idUsuario,
            title: tarea.nombre + " - Fecha Inicial Propuesta: " +
                tarea.fechaIniciaProp.substring(0,4) + "-" + tarea.fechaIniciaProp.substring(5,7) + "-" + tarea.fechaIniciaProp.substring(8,10),
            startDate: new Date(tarea.fechaInicia.substring(0,4), tarea.fechaInicia.substring(5,7) - 1, tarea.fechaInicia.substring(8,10),
                tarea.fechaInicia.substring(11,13), tarea.fechaInicia.substring(14,16)),
            members: [tarea.idUsuario]
          });
        }
      });
    });

    return tareasCalendario
  }
  const ordenesTareasCalendario = ordenesCalendarioFiltradas(ordenes);
  console.log("TAREAS CALENDARIO: ", ordenesTareasCalendario);

  // Control de Ordenes
  function controlDeOrdenes(ordenes, ordenesSinComenzar, ordenesFinalizadas) {
    let controlOrdenes = [];

    ordenes.map(orden => {
      let estado="";
      let color="";
      let cantTareasSinComenzarPorOrden=0;
      let cantTareasFinalizadasPorOrden=0;
      let cantTareasPendientesPorOrden=0;

      ordenesSinComenzar.map(ordenSinComenzar => {
        ordenesFinalizadas.map(ordenfinalizada => {
          if(orden.id === ordenSinComenzar.id) {
            estado="sin comenzar"
            color="#ffcc00"
            cantTareasSinComenzarPorOrden++
          }
          if (orden.id === ordenfinalizada.id) {
            estado="completado"
            color="#00b33c"
            cantTareasFinalizadasPorOrden++
          }
        })
      });

      let fechaEstimada;
      // Como fecha estimada, le asgine el ultimo fecha inicia prop del array de tareas, como para tener un estimativo
      orden.tareas.map(tarea => {
        if (tarea.fechaInicia != null && tarea.fechaFin == null) {
          estado="pendiente"
          color="#e60000"
          cantTareasPendientesPorOrden++
        }
        fechaEstimada = tarea.fechaIniciaProp.substring(0,10)
      });

      let cantTareasPorOrden = orden.tareas.length;
      let porcentaje = 0;
      if (cantTareasPorOrden !== 0) {
        let diferencial = cantTareasPorOrden - cantTareasPendientesPorOrden + cantTareasSinComenzarPorOrden;

        porcentaje = ((diferencial * 100) / cantTareasPorOrden);
        if( estado === "sin comenzar") porcentaje = 0;
        if (cantTareasPorOrden === cantTareasFinalizadasPorOrden) porcentaje = 100;
      }

      controlOrdenes.push({
        nombre: "Orden " + orden.numero,
        idDeLaOrden: orden.id,
        tareas: cantTareasPorOrden,
        estado: estado,
        color:color,
        porcentaje:porcentaje,
        fecha_estimada:fechaEstimada
      });
    });

    return controlOrdenes;
  }
  const analisisOrdenes = controlDeOrdenes(ordenes, ordenesSinComenzar, ordenesFinalizadas);
  console.log("ARRAY CONTROL DE ORDENES:", analisisOrdenes);

  // const analisisOrdenes = [
  //   { nombre: "orden 1", tareas: 10, porcentaje: 13, fecha_estimada: "24-2-1", estado:"pendiente", color: "#e60000"},
  //   { nombre: "orden 2", tareas: 200, porcentaje: 100, fecha_estimada: 24, estado:"completado" , color:"#00b33c"},
  //   { nombre: "orden 3", tareas: 200, porcentaje: 50, fecha_estimada: 24, estado:"pendiente" , color: "#e60000"},
  //   { nombre: "orden 4", tareas: 200, porcentaje: 6.0, fecha_estimada: 24, estado:"pendiente", color: "#e60000"},
  //   { nombre: "orden 5", tareas: 200, porcentaje: 6.0, fecha_estimada: 24, estado:"pendiente", color: "#e60000"},
  //   { nombre: "orden 6", tareas: 200, porcentaje: 0, fecha_estimada: 24, estado:"sin empezar", color: "#ffcc00"}
  // ];

  // SIRVE PARA MOSTRAR LOS USUARIOS CON SU RESPECTIVAS TAREAS EN EL CALENDARIO
  function usuariosFiltrados(usuarios){
    let usuariosResources = [];

    usuarios.map(usuario => {
      usuariosResources.push({
        id: usuario.id,
        text: usuario.nombre + " " + usuario.apellido
      });
    })

    return usuariosResources;
  }
  const resources = [
    {
      //se debe respetar este formato para que se visualicen los miembros
      fieldName: 'members',
      title: 'Members',
      allowMultiple: true,
      instances :usuariosFiltrados(usuarios)
    },
  ];
  console.log("RESOURCES: ",resources);

  const statusUsuarios = useSelector(state => state.usuarios.status);
  const statusProcesos = useSelector((state) => state.procesos.status);
  const statusOrdenes = useSelector((state) => state.ordenes.status);
  const errorUsuarios = useSelector((state) => state.usuarios.error);
  const errorProcesos = useSelector((state) => state.procesos.error);
  const errorOrdenes = useSelector((state) => state.ordenes.error);

  useEffect(() => { if (statusUsuarios === "idle") { dispatch(fetchUsuarios()); }}, [statusUsuarios, dispatch]);
  useEffect(() => { if (statusProcesos === "idle") { dispatch(fetchProcesos()); }}, [statusProcesos, dispatch]);
  useEffect(() => { if (statusOrdenes === "idle") { dispatch(fetchOrdenes()); }}, [statusOrdenes, dispatch]);

  if (statusUsuarios === 'loading' || statusProcesos === 'loading' || statusOrdenes === 'loading') { return <Spinner />; }
  if (statusUsuarios === 'failed') { return <Error mensaje = { errorUsuarios } />; }
  if (statusProcesos === 'failed') { return <Error mensaje = { errorProcesos } />; }
  if (statusOrdenes === 'failed') { return <Error mensaje = { errorOrdenes } />; }

  return (
    <DashBoard
        cantOrdenes = { cantOrdenes }
        cantTareas = { cantTareas }
        ordenesPorEstado = { ordenesPorEstado }
        tareasPorEstado = { tareasPorEstado }
        analisisOrdenes = { analisisOrdenes }
        ordenesTareasCalendario = { ordenesTareasCalendario }
        resources = { resources }
        usuarioTareasComponente = { usuarioTareasComponente }
    />
  );
};

export default DashBoardContainer;
