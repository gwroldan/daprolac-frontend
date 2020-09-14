import React, { Component} from "react";
import { connect } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";

import Spinner from "../../components/utils/Spinner";
import Error from "../../components/utils/Error";
import ProcesoDetalle from "../../components/procesos/ProcesoDetalle";
import { getProceso, editarProceso } from "../../store/actions/procesosAction";

class ProcesoDetalleContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      observaciones: "",
      // proceso: {
      //   idProceso: "",
      //   tareaAntecesora: {
      //     idTareaAntecesora: "",
      //     diasAntecesora: "",
      //     horasAntecesora: "",
      //     minutosAntecesora: ""
      //   }
      // },
      text: "",
      nombre: "",
      unidadMedida: "",
      tipo: "",
      minimo: 0,
      maximo: 0,
      obligatorio:false,
      tarea: {
        idTarea: "",
        obligatorio: false
      },
      //valor:"",
      opciones:[{valor:""}],
      open: false,
      setOpen: false,
      DataProcesos: [
        { producto: "",
          tareas: [{
            proceso_tarea: {},
            datos: [{
              tarea_dato:{ obligatorio: ""},
              opciones:[{valor:""}]}] }] }
      ],
      idTareaAnterior: "",
      shown: true,
      editVisibles: {},
      editVisibles1: {},
      editVisibles2: {},
      loading: true,

      producto: '',
      editarProceso: false
    };
  }

  // showEditDiv = id => {
  //   this.setState(prevState => ({
  //     editVisibles: {
  //       ...prevState.editVisibles,
  //       [id]: !prevState.editVisibles[id]
  //     }
  //   }));
  // };
  //
  // showEditDiv1 = id => {
  //   this.setState(prevState => ({
  //     editVisibles1: {
  //       ...prevState.editVisibles1,
  //       [id]: !prevState.editVisibles1[id]
  //     }
  //   }));
  // };
  //
  // showEditDiv2 = id => {
  //   this.setState(prevState => ({
  //     editVisibles2: {
  //       ...prevState.editVisibles2,
  //       [id]: !prevState.editVisibles2[id]
  //     }
  //   }));
  // };

  // crearDato(idTarea, e, index) {
  //   this.setState({ isLoaded: true });
  //   e.preventDefault();
  //
  //   let id = this.props.match.params.id;
  //   const dato = {
  //     nombre: this.state.nombre,
  //     unidadMedida: this.state.unidadMedida,
  //     tipo: this.state.tipo,
  //     minimo: this.state.minimo,
  //     maximo: this.state.maximo,
  //     tarea: {
  //       idTarea: idTarea,
  //       obligatorio: this.state.obligatorio
  //     },
  //     opciones: this.state.opciones
  //     //   opciones:[
  //     //     {
  //     //     valor: this.state.opciones.valor
  //     //     }
  //     // ]
  //   };
  //
  //   console.log(dato);
  //
  //   axios
  //       .post("https://daprolac.herokuapp.com/api/v1/datos/?eager=1", dato)
  //       .then(res => {
  //         console.log(res);
  //         console.log(res.data);
  //         Swal.fire("Se agregó el dato", res.data.mensaje, "success");
  //
  //         this.props.history.push("/procesos/" + id);
  //         this.getProcesoInfo();
  //         if(this.state.editVisibles1[idTarea]){
  //           this.showEditDiv1(idTarea)
  //         }
  //       })
  //       .catch(error => {
  //         console.log(error.response);
  //         Swal.fire(
  //             "Hubo un error",
  //             "El dato no cumple con los parametros",
  //             "error"
  //         );
  //         this.props.history.push("/procesos/" + id);
  //       });
  // }
  //
  // crearTarea(idProceso, e) {
  //   e.preventDefault();
  //
  //   const tarea = {
  //     nombre: this.state.nombre,
  //     proceso: {
  //       idProceso: idProceso
  //     }
  //   };
  //
  //   console.log(tarea);
  //
  //   if(this.state.DataProcesos[0].tareas.length != 0 &&  this.state.DataProcesos[0].tareas.length != 1 ) {
  //
  //     if(this.state.DataProcesos[0].tareas[1].proceso_tarea.idTareaAntecesora != null)  {
  //       axios
  //           .post("https://daprolac.herokuapp.com/api/v1/tareas/?eager=1", tarea)
  //           .then(res => {
  //             console.log(res);
  //             console.log(res.data);
  //             Swal.fire("Se agregó la tarea", res.data.mensaje, "success");
  //             this.getProcesoInfo();
  //             if(this.state.editVisibles[idProceso]){
  //               this.showEditDiv(idProceso)
  //             }
  //           })
  //           .catch(error => {
  //             console.log(error.response);
  //             Swal.fire(
  //                 "Hubo un error",
  //                 "La tarea no cumple con los parametros",
  //                 "error"
  //             );
  //           });
  //     }
  //     else{
  //       Swal.fire("No se puede agregar mas de 2 tareas sin tareas antecesoras", "error")
  //     }
  //   }
  //   else{
  //     axios
  //         .post("https://daprolac.herokuapp.com/api/v1/tareas/?eager=1", tarea)
  //         .then(res => {
  //           console.log(res);
  //           console.log(res.data);
  //           Swal.fire("Se agregó la tarea", res.data.mensaje, "success");
  //           this.getProcesoInfo();
  //           if(this.state.editVisibles[idProceso]){
  //             this.showEditDiv(idProceso)
  //           }
  //         })
  //         .catch(error => {
  //           console.log(error.response);
  //           Swal.fire(
  //               "Hubo un error",
  //               "La tarea no cumple con los parametros",
  //               "error"
  //           );
  //         });
  //   }
  //
  //
  //
  // }

  // crearTareaConIdAntecesora(idProceso, e, idTareaAnterior) {
  //   e.preventDefault();

  //   const tarea = {
  //     nombre: this.state.nombre,
  //     proceso: {
  //       idProceso: idProceso,
  //       tareaAntecesora: {
  //         idTareaAntecesora: idTareaAnterior,
  //         diasAntecesora: this.state.diasAntecesora,
  //         horasAntecesora: this.state.horasAntecesora,
  //         minutosAntecesora: this.state.minutosAntecesora
  //       }
  //     }
  //   };

  //   console.log(tarea);

  //   axios
  //     .post("https://daprolac.herokuapp.com/api/v1/tareas/?eager=1", tarea)
  //     .then(res => {
  //       console.log(res);
  //       console.log(res.data);
  //     })
  //     .catch(error => {
  //       console.log(error.response);
  //     });
  // }

  // editarTarea(idTarea, e) {
  //   e.preventDefault();
  //
  //   const tarea = {
  //     nombre: this.state.nombre,
  //     observaciones: this.state.observaciones
  //   };
  //
  //   console.log(tarea);
  //
  //   axios
  //       .put(
  //           "https://daprolac.herokuapp.com/api/v1/tareas/" + idTarea + "?eager=1",
  //           tarea
  //       )
  //       .then(res => {
  //         console.log(res);
  //         console.log(res.data);
  //         Swal.fire("Se edito la tarea", res.data.mensaje, "success");
  //         this.getProcesoInfo();
  //         if(this.state.editVisibles[idTarea]){
  //           this.showEditDiv(idTarea)
  //         }
  //
  //
  //       })
  //       .catch(error => {
  //         console.log(error.response);
  //         Swal.fire(
  //             "Hubo un error",
  //             "La tarea no cumple con los parametros",
  //             "error"
  //         );
  //       });
  //
  // }
  //
  // editarTareaConIdAntecesora(idTarea, e, idProceso, idTareaAnterior) {
  //   e.preventDefault();
  //
  //   const tarea = {
  //     nombre: this.state.nombre,
  //     observaciones: this.state.observaciones,
  //     proceso: {
  //       idProceso: idProceso,
  //       tareaAntecesora: {
  //         idTareaAntecesora: idTareaAnterior,
  //         diasAntecesora: this.state.diasAntecesora,
  //         horasAntecesora: this.state.horasAntecesora,
  //         minutosAntecesora: this.state.minutosAntecesora
  //       }
  //     }
  //   };
  //
  //   console.log(tarea);
  //
  //   axios
  //       .put(
  //           "https://daprolac.herokuapp.com/api/v1/tareas/" + idTarea + "?eager=1",
  //           tarea
  //       )
  //       .then(res => {
  //         console.log(res);
  //         console.log(res.data);
  //         Swal.fire("Se edito la tarea", res.data.mensaje, "success");
  //         this.getProcesoInfo();
  //         if(this.state.editVisibles[idTarea]){
  //           this.showEditDiv(idTarea)
  //         }
  //       })
  //       .catch(error => {
  //         console.log(error.response);
  //         Swal.fire(
  //             "Hubo un error",
  //             "La tarea no cumple con los parametros",
  //             "error"
  //         );
  //       });
  // }

  // borrarTarea(id, e) {
  //   Swal.fire({
  //     title: "¿Estás seguro que deseas eliminar la tarea?",
  //     type: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Si, Eliminar",
  //     cancelButtonText: "No, Cancelar"
  //   }).then(result => {
  //     if (result.value) {
  //       // eliminar en la rest api
  //       axios
  //           .delete(
  //               "https://daprolac.herokuapp.com/api/v1/tareas/" + id + "?eager=1"
  //           )
  //           .then(res => {
  //             console.log(res);
  //             console.log(res.data);
  //             if (res.status === 200) {
  //               Swal.fire("Eliminado", res.data.mensaje, "success");
  //             }
  //             this.getProcesoInfo();
  //           })
  //           .catch(error => {
  //             console.log(error.response);
  //             Swal.fire(
  //                 "Hubo un error",
  //                 "Existe una tarea antecesora asociada",
  //                 "error"
  //             );
  //           });
  //     }
  //   });
  // }
  //
  // borrarDato(idProceso, idDato, e) {
  //   Swal.fire({
  //     title: "¿Estás seguro que deseas eliminar el dato?",
  //     type: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Si, Eliminar",
  //     cancelButtonText: "No, Cancelar"
  //   }).then(result => {
  //     if (result.value) {
  //       // eliminar en la rest api
  //       axios
  //           .delete(
  //               "https://daprolac.herokuapp.com/api/v1/datos/" + idDato + "?eager=1"
  //           )
  //           .then(res => {
  //
  //             console.log(res);
  //             console.log(res.data);
  //             if (res.status === 200) {
  //               Swal.fire("Eliminado", res.data.mensaje, "success");
  //             }
  //             this.getProcesoInfo();
  //           })
  //
  //     }
  //   });
  //
  //   // axios
  //   //   .delete(
  //   //     "https://daprolac.herokuapp.com/api/v1/datos/" + idDato + "?eager=1"
  //   //   )
  //   //   .then(res => {
  //   //     console.log(res);
  //   //     console.log(res.data);
  //   //   });
  // }
  //
  // editarDato(idTarea,idDato, e) {
  //   e.preventDefault();
  //
  //   const dato = {
  //     nombre: this.state.nombre,
  //     unidadMedidad: this.state.unidadMedidad,
  //     tipo: this.state.tipo,
  //     minimo: this.state.minimo,
  //     maximo: this.state.maximo,
  //     tarea: {
  //       idTarea: idTarea,
  //       obligatorio: this.state.obligatorio
  //     },
  //     opciones: this.state.opciones
  //   };
  //
  //   console.log(dato);
  //
  //   axios
  //       .put(
  //           "https://daprolac.herokuapp.com/api/v1/datos/" + idDato + "?eager=1",
  //           dato
  //       )
  //       .then(res => {
  //         console.log(res);
  //         console.log(res.data);
  //         Swal.fire("Se edito el dato", res.data.mensaje, "success");
  //         this.getProcesoInfo();
  //         if(this.state.editVisibles[idDato]){
  //           this.showEditDiv(idDato)
  //         }
  //       })
  //       .catch(error => {
  //         console.log(error.response);
  //         Swal.fire(
  //             "Hubo un error",
  //             "El dato no cumple con los parametros",
  //             "error"
  //         );
  //       });
  // }

  //
  //
  // handleSelectChange = event => {
  //   this.setState({
  //     idTareaAnterior: event.target.value
  //   });
  // };
  //
  // handleSelectChange1 = event => {
  //   this.setState({
  //     tipo: event.target.value
  //   });
  // };
  //
  // funcion() {
  //   console.log(
  //       this.state.DataProcesos[0].tareas.findIndex(
  //           tarea => tarea.proceso_tarea.idTareaAntecesora == null
  //       ) == 0
  //   );
  //   // console.log(this.state.DataProcesos[0].tareas.findIndex(tarea => tarea.id));
  //   console.log(
  //       this.state.DataProcesos[0].tareas.findIndex(tarea => tarea.id) > 770
  //   );
  //   console.log(this.state.DataProcesos[0].tareas.length);
  // }
  //
  // funcion2(){
  //
  //   {this.state.DataProcesos[0].tareas.map(function(tar,ind){
  //
  //     if(tar.proceso_tarea.idTareaAntecesora == null && ind !=0){
  //       return (
  //           console.log(tar.nombre +" sin asignar")
  //       );
  //     }
  //
  //
  //   })}
  //
  // }
  //
  // filtro(index){
  //
  //   // for( const i in this.state.DataProcesos[0].tareas){
  //   //     if(i == index){
  //   //       return this.state.DataProcesos[0].tareas.slice(i,index);
  //   //     }else{
  //   //       return (console.log("me fui"));
  //   //     }
  //   // }
  // }
  //
  //
  //
  // handleChangeInput = ( index, e) => {
  //
  //   const opciones = [...this.state.opciones];
  //   if (e.target.name === "valor") {
  //     opciones[index].valor = e.target.value;
  //   }
  //
  //   this.setState({
  //     opciones}
  //   )
  //
  //   console.log(opciones);
  //
  //
  // }
  //
  // handleChangeInput2 =  e => {
  //
  //   if(["valor"].includes(e.target.name)){
  //     let opciones = [...this.state.opciones];
  //     opciones[e.target.id][e.target.name] = e.target.value;
  //     this.setState({opciones});
  //   }
  //   else{
  //     this.setState({[e.target.name] :e.target.value})
  //   }
  //
  //   // const opciones = [...this.state.opciones];
  //
  //   // if (e.target.name === "valor") {
  //   //   opciones[index].valor = e.target.value;
  //   // }
  //
  //
  //   // this.setState({
  //   //   opciones}
  //   // )
  //
  //   // console.log(opciones);
  //
  //
  // }
  //
  // handleAddFields = () => {
  //   const opciones = [...this.state.opciones];
  //   opciones.push({ valor: '' });
  //   this.setState({opciones})
  //   console.log(...this.state.opciones);
  //
  //   // this.setState({opciones: [...this.state.opciones, {valor:""}]})
  //   // console.log(...this.state.opciones);
  // }
  //
  // handleRemoveFields = (index) => {
  //   const opciones  = [...this.state.opciones];
  //   opciones.splice(index, 1);
  //   this.setState({opciones});
  // }

  // ordenarTareas (tareasDesordenadas){
  //   var TareasOrdenadas =[];
  //
  //
  //   if(tareasDesordenadas.length >0){
  //     TareasOrdenadas.push(tareasDesordenadas[0])
  //     for(var i=1; i < tareasDesordenadas.length ; i++){
  //
  //
  //       TareasOrdenadas.push(this.traerTareaPosterior(tareasDesordenadas, TareasOrdenadas[TareasOrdenadas.length-1].id))
  //
  //     }
  //   }
  //
  //   return (TareasOrdenadas)
  // }
  // traerTareaPosterior(tareasDesordenadas,idTareaAntecesora){
  //   var contador =1;
  //   if(idTareaAntecesora != null){
  //     while(contador < tareasDesordenadas.length ){
  //       if(tareasDesordenadas[contador].proceso_tarea.idTareaAntecesora == idTareaAntecesora){
  //         return (
  //             tareasDesordenadas[contador]
  //         )
  //       }
  //       contador ++;
  //     }
  //     contador=1;
  //     while(tareasDesordenadas[contador].proceso_tarea.idTareaAntecesora != null){
  //
  //       contador ++;
  //     }
  //     return (
  //         tareasDesordenadas[contador]
  //     )
  //   }
  //   else{
  //     while(contador < tareasDesordenadas.length){
  //       if(tareasDesordenadas[contador].id != idTareaAntecesora){
  //         return (
  //             tareasDesordenadas[contador]
  //         )
  //       }
  //       contador ++;
  //     }
  //   }
  //
  //
  //
  // }
  //
  // filtrarTareas(tareasFiltradas,idTareaAntecesora){
  //
  //   var nuevasTareasFiltradas=[];
  //   nuevasTareasFiltradas.push({})
  //   for( var i =0; i < tareasFiltradas.length ;i ++){
  //
  //     if( !this.esTareaAsignada(tareasFiltradas[i]) || idTareaAntecesora == tareasFiltradas[i].id ){
  //       nuevasTareasFiltradas.push(tareasFiltradas[i])
  //     }
  //
  //   }
  //
  //   return nuevasTareasFiltradas
  // }
  //
  // esTareaAsignada(tarea){
  //
  //   for(var j =0 ; j < this.state.DataProcesos[0].tareas.length ; j++){
  //
  //     if(tarea.id == this.state.DataProcesos[0].tareas[j].proceso_tarea.idTareaAntecesora  ){
  //       return (true)
  //     }
  //
  //   }
  //   return false
  // }

  async componentDidMount() {
    await this.props.getProceso(this.props.match.params.id);
    this.setState({
      ...this.state,
      producto: this.props.proceso.producto
    })
  }

  handleEditAtributos = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleHabilitaEditProceso = () => {
    this.setState({
      ...this.state,
      editarProceso: !this.state.editarProceso
    });
  }

  handleEditarProceso = async (idProceso, event) => {
    if (event.type === 'keypress' && event.charCode !== 13) {
      return
    }

    await this.props.editarProceso(idProceso, { producto: this.state.producto });
    this.handleHabilitaEditProceso();
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
        state = { this.state }
        proceso = { this.props.proceso }
        handleHabilitaEditProceso = { this.handleHabilitaEditProceso }
        handleEditAtributos = { this.handleEditAtributos }
        handleEditarProceso = { this.handleEditarProceso }
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
  editarProceso
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcesoDetalleContainer);
