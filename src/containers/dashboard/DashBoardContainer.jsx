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
  const ordenes= useSelector(selectOrdenesWithNested)
  const usuarios= useSelector(selectAllUsarios)
  const tareas= useSelector(selectAllTareas)
  const ordenesSinComenzar= useSelector(selectOrdenesSinComenzar())
  const ordenesFinalizadas = useSelector(selectOrdenesFinalizadas)


  console.log("ORDENES SIN COMENZAR:", ordenesSinComenzar);
  

  const ordenesPorEstado = [
    { name: "Terminadas", value: cantOrdenesFinalizadas, color: "success" },
    { name: "Pendientes", value: cantOrdenes - cantOrdenesFinalizadas - cantOrdenesSinComenzar, color: "error" },
    { name: "Sin empezar", value: cantOrdenesSinComenzar, color: "warning" },
  ];

  //control de tareas
  function usuariosTareas(ordenes){
    var usuarioTareaObjeto={};
    var usuarioTareasArray=[];

  
    var idUsuariosTareas=[]

      ordenes.map(orden =>{
        orden.tareas.map(tarea =>{

          var idUsuarioPosicion=idUsuariosTareas.indexOf(tarea.idUsuario)
          if(  idUsuarioPosicion != -1 ){

            
            if(tarea.fechaInicia !=null && tarea.fechaFin !=null){

              usuarioTareasArray[idUsuarioPosicion].completadas++;
            }
            else if (tarea.fechaInicia !=null && tarea.fechaFin ==null){
              usuarioTareasArray[idUsuarioPosicion].pendientes++
            }
            else if(tarea.fechaInicia == null && tarea.fechaFin ==null){
              usuarioTareasArray[idUsuarioPosicion].sinEmpezar++;
            }


          }
          else if(tarea.idUsuario !=null) {
            
            var completadas=0
            var pendientes =0
            var sinEmpezar=0
            if(tarea.fechaInicia !=null && tarea.fechaFin !=null){

              completadas++;
            }
            else if (tarea.fechaInicia !=null && tarea.fechaFin ==null){
              pendientes++
            }
            else if( tarea.fechaInicia == null && tarea.fechaFin ==null){
              sinEmpezar++;
            }
            var idUsuarioArrayUsuarios=buscarUsuario(tarea.idUsuario)
            if( idUsuarioArrayUsuarios != -1 ){
              usuarioTareaObjeto={
                name:usuarios[idUsuarioArrayUsuarios].nombre + " "+ usuarios[idUsuarioArrayUsuarios].apellido,
                idUsuario:tarea.idUsuario,
                completadas:completadas,
                pendientes:pendientes,
                sinEmpezar:sinEmpezar,
                idTarea:tarea.idTarea

              }
            }
            else{
              usuarioTareaObjeto={
                name:"",
                idUsuario:tarea.idUsuario,
                completadas:completadas,
                pendientes:pendientes,
                sinEmpezar:sinEmpezar,
                idTarea:tarea.idTarea
              }
            }
            


            usuarioTareasArray.push(usuarioTareaObjeto)
            idUsuariosTareas.push(tarea.idUsuario)
          } 
          
        })
      })

      // console.log("USUARIO TAREAS:", usuarioTareasArray)
      return usuarioTareasArray;
  }

  //busco el usuario para el control de tareas
  function buscarUsuario(idUsuario){

    for(var i=0;i<usuarios.length;i++){
      

      if(usuarios[i].id == idUsuario){
          return i;
      }
    }
    return -1;
  }

  const usuarioTareasComponente=usuariosTareas(ordenes)
  console.log("USUARIO TAREAS:", usuarioTareasComponente)


  //tareas calendario
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
                startDate: new Date(tarea.fechaInicia.substring(0,4),tarea.fechaInicia.substring(5,7) - 1, tarea.fechaInicia.substring(8,10), tarea.fechaInicia.substring(11,13), tarea.fechaInicia.substring(14,16)),
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

  //control de ordenes
  function controlDeOrdenes(ordenes,ordenesSinComenzar,ordenesFinalizadas){

    var objetoControlOrdenes={}
    var arrayControlOrdenes=[]
    
    ordenes.map(orden =>{
      var nombreOrden="orden " + orden.numero
      var estado=""
      var color=""
      var porcentaje=0
      var cantTareasPorOrden=0
      var cantTareasSinComenzarPorOrden=0
      var cantTareasFinalizadasPorOrden=0
      var cantTareasPendientesPorOrden=0
      ordenesSinComenzar.map(ordenSinComenzar =>{
        ordenesFinalizadas.map(ordenfinalizada =>{


          if(orden.id == ordenSinComenzar.id){

            estado="sin comenzar"
            color="#ffcc00"
            cantTareasSinComenzarPorOrden++
          }
          if (orden.id == ordenfinalizada.id){
            estado="completado"
            color="#00b33c"
            cantTareasFinalizadasPorOrden++
          }
          
        })
      })

      var fechaEstimada
      //como fecha estimada, le asgine el ultimo fecha inicia prop del array de tareas, como para tener un estimativo
      orden.tareas.map(tarea =>{

        if (tarea.fechaInicia!=null && tarea.fechaFin ==null){
          estado="pendiente"
          color="#e60000"
          cantTareasPendientesPorOrden++
        }

        fechaEstimada=tarea.fechaIniciaProp.substring(0,10)
      })

      

        if (orden.tareas.length != 0){
            cantTareasPorOrden=orden.tareas.length 
            console.log("CANT TAREAS FINALIZADAS POR ORDEN "+nombreOrden,cantTareasFinalizadasPorOrden)
            console.log("CANT TAREAS SIN EMPEZAR POR ORDEN "+nombreOrden,cantTareasSinComenzarPorOrden)
            console.log("CANT TAREAS PENDIENTES POR ORDEN "+nombreOrden,cantTareasPendientesPorOrden)

            var diferencial= cantTareasPorOrden - cantTareasPendientesPorOrden + cantTareasSinComenzarPorOrden 
            console.log("DIFERENCIAL:" , diferencial)  
            if (cantTareasPorOrden == cantTareasFinalizadasPorOrden){
              porcentaje=100
            } else if( estado =="sin comenzar")
              porcentaje =0
            else{
              porcentaje=((diferencial * 100) / cantTareasPorOrden).toFixed(2)
            }
           
            //console.log("CANTIDAD DE TAREAS POR ORDEN:",cantTareasPorOrden)
        }
       
        objetoControlOrdenes={
          nombre:nombreOrden,
          idDeLaOrden:orden.id,
          tareas: cantTareasPorOrden,
          estado:estado,
          color:color,
          porcentaje:porcentaje,
          fecha_estimada:fechaEstimada
        }

        arrayControlOrdenes.push(objetoControlOrdenes)

      
      
     
    })

    console.log("ARRAY CONTROL DE ORDENES:", arrayControlOrdenes)
      return arrayControlOrdenes

  }

  const analisisOrdenes=controlDeOrdenes(ordenes,ordenesSinComenzar,ordenesFinalizadas)

  // const analisisOrdenes = [
  //   { nombre: "orden 1", tareas: 10, porcentaje: 13, fecha_estimada: "24-2-1", estado:"pendiente", color: "#e60000"},
  //   { nombre: "orden 2", tareas: 200, porcentaje: 100, fecha_estimada: 24, estado:"completado" , color:"#00b33c"},
  //   { nombre: "orden 3", tareas: 200, porcentaje: 50, fecha_estimada: 24, estado:"pendiente" , color: "#e60000"},
  //   { nombre: "orden 4", tareas: 200, porcentaje: 6.0, fecha_estimada: 24, estado:"pendiente", color: "#e60000"},
  //   { nombre: "orden 5", tareas: 200, porcentaje: 6.0, fecha_estimada: 24, estado:"pendiente", color: "#e60000"},
  //   { nombre: "orden 6", tareas: 200, porcentaje: 0, fecha_estimada: 24, estado:"sin empezar", color: "#ffcc00"}
  // ];

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
        usuarioTareasComponente={usuarioTareasComponente}
    />
  );
};

export default DashBoardContainer;
