import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

import DashBoard from "../../components/dashboard/DashBoard";
import Spinner from "../../components/utils/Spinner";
import Error from "../../components/utils/Error";

import {
  fetchOrdenes,
  selectAllOrdenes,
  selectOrdenesFinalizadas,
  selectOrdenesWithNested,
} from "../../store/reducers/ordenesSlice";

import {
  selectAllTareasOrdenes,
  selectOrdenesSinComenzar,
  selectTareasOrdenesSinComenzar,
  selectTareasOrdenesFinalizadas
} from "../../store/reducers/tareasOrdenesSlice";

import {
  fetchUsuarios,
  selectAllUsarios
} from "../../store/reducers/usuariosSlice";

import { selectAllTareas } from "../../store/reducers/tareasSlice"


const DashBoardContainer = props => {
  const dispatch = useDispatch();
  const cantOrdenes = useSelector(selectAllOrdenes).length;
  const cantOrdenesFinalizadas = useSelector(selectOrdenesFinalizadas).length;
  const cantOrdenesSinComenzar = useSelector(selectOrdenesSinComenzar()).length;
  //NECESITO TRAER LAS ORDENES CON TODOS SUS ARRAYS EMBEBIDOS, SE DEBE CREAR OTRA FUNCION PARECIDA A SelectOrdenesWithNested, pero que traiga absolutamente todo
  const ordenes= useSelector(selectOrdenesWithNested)
  const usuarios= useSelector(selectAllUsarios)
  const tareas= useSelector(selectAllTareas)

  

  const ordenesPorEstado = [
    { name: "Terminadas", value: cantOrdenesFinalizadas, color: "success" },
    { name: "Pendientes", value: cantOrdenes - cantOrdenesFinalizadas - cantOrdenesSinComenzar, color: "error" },
    { name: "Sin empezar", value: cantOrdenesSinComenzar, color: "warning" },
  ];

  function usuariosTareas(ordenes,usuarios){
    var usuarioTareaObjeto={};
    var usuarioTareasArray=[];
      ordenes.map(orden =>{
        orden.tareas.map(tarea =>{
          usuarios.map(user =>{
            if(tarea.idUsuario == user.id){
              var completadas=0
              var pendientes =0
              var sinEmpezar=0
              if(tarea.fechaInicia !=null && tarea.fechaFin !=null){
                completadas++;
              }
              else if (tarea.fechaInicia !=null && tarea.fechaFin ==null){
                pendientes++
              }
              else if(tarea.fechaInicia == null && tarea.fechaFin ==null){
                sinEmpezar++;
              }
              usuarioTareaObjeto={
                name:user.nombre + " "+ user.apellido,
                completadas:completadas,
                pendientes:pendientes,
                sinEmpezar:sinEmpezar
              }
              usuarioTareasArray.push(usuarioTareaObjeto)
            }
          })
        })
      })

      // console.log("USUARIO TAREAS:", usuarioTareasArray)
      return usuarioTareasArray;
  }

  const usuarioTareasComponente=usuariosTareas(ordenes,usuarios)
  console.log("USUARIO TAREAS:", usuarioTareasComponente)


  //PARA QUE FUNCIONE Y LOS MUESTRE BIEN TENGO QUE TRAER EL ARRAY EMBEBIDO (EL DE TAREAS) QUE FALTA DE ORDENES
  function ordenesCalendarioFiltradas(ordenes,tareas){
    var tareasCalendario = [];
    var tareaObjetoCalendario = {};
    var id=0
    console.log(tareas)
    ordenes.map(orden => {
      orden.tareas.map(tarea => {
            tareas.map(t => {
            if (tarea.idTarea == t.id  && tarea.fechaInicia != null && tarea.fechaFin == null) {
              tareaObjetoCalendario = {
                id: id + 1,
                idTarea:tarea.idTarea,
                idUsuario:tarea.idUsuario,
                title:t.nombre + "-Fecha Inicial Propuesta: "+ tarea.fechaIniciaProp.substring(0,4)+"-"+tarea.fechaIniciaProp.substring(5,7) +"-"+tarea.fechaIniciaProp.substring(8,10) ,
                //title:"ordenes",
                //startDate:new Date(2021, 9, 18, 12, 35),
                //startDate:tarea.fechaInicia.substring(0,4) + tarea.fechaInicia.substring(5,7) + tarea.fechaInicia.substring(8,10) + tarea.fechaInicia.substring(11,13) + tarea.fechaInicia.substring(14,16),
                startDate: new Date(tarea.fechaInicia.substring(0,4),tarea.fechaInicia.substring(5,7) - 1, tarea.fechaInicia.substring(8,10), tarea.fechaInicia.substring(11,13), tarea.fechaInicia.substring(14,16)),
                //endDate: null ,
                //fechaIniciaProp: tarea.fechaIniciaProp,
                //members:[tarea.idUsuario],
                members:[tarea.idUsuario]
              };
              tareasCalendario.push(tareaObjetoCalendario);
              id++
            }
          });
      });
    });
    console.log("TAREAS CALENDARIO: ",tareasCalendario)
    return tareasCalendario
  }

  const ordenesTareasCalendario = ordenesCalendarioFiltradas(ordenes,tareas)


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


  //SIRVE PARA MOSTRAR LOS USUARIOS CON SU RESPECTIVAS TAREAS EN EL CALENDARIO
  function usuariosFiltrados(usuarios){
    var usuariosResources=[]
    var usuarioObjetoResource = {};

    usuarios.map(usuario =>{
      usuarioObjetoResource={
        id:usuario.id,
        text:usuario.nombre + " "+usuario.apellido
      }
      usuariosResources.push(usuarioObjetoResource)
    })

    return usuariosResources
  }

  const instances=usuariosFiltrados(usuarios)

  const resources = [
    {
        //se debe respetar este formato para que se visualicen los miembros
        fieldName: 'members',
        title: 'Members',
        allowMultiple: true,
        instances :instances
      },
]

console.log("RESOURCES: ",resources)

  const postStatus = useSelector((state) => state.procesos.status);
  const postStatusUsuarios = useSelector(state => state.usuarios.status);
  const error = useSelector((state) => state.procesos.error);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchOrdenes());
    }
  }, [postStatus, dispatch]);

  useEffect(() => {
    if (postStatusUsuarios === "idle") {
      dispatch(fetchUsuarios());
    }
  }, [postStatusUsuarios, dispatch]);

  if (postStatus === 'loading') {
    return <Spinner />;
  }
  if (postStatus === 'failed') {
    return <Error mensaje = { error } />;
  }

  if (postStatusUsuarios === 'loading') {
    return <Spinner />;
  }
  if (postStatusUsuarios === 'failed') {
    return <Error mensaje = { error } />;
  }

  return (
    <DashBoard
        cantOrdenes = { cantOrdenes }
        cantTareas = { cantTareas }
        ordenesPorEstado = { ordenesPorEstado }
        tareasPorEstado = { tareasPorEstado }
        analisisOrdenes = { analisisOrdenes }
        ordenesTareasCalendario={ordenesTareasCalendario}
        resources={resources}
    />
  );
};

export default DashBoardContainer;
