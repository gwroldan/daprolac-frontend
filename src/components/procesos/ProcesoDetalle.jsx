import React, { Fragment, useState } from "react";

import {Button, Modal, TextField, Typography, useTheme} from "@material-ui/core";
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@material-ui/lab';
import { makeStyles } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import ScheduleIcon from '@material-ui/icons/Schedule';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import TareasProcesoList from "../tareas/TareasProcesoList";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    marginTop: theme.spacing()
  },
  container: {
    backgroundColor: "#ccc",
    borderRadius: 3,
    width: 300,
    padding: 8,
    height: "100%",
    marginRight: 8
  },
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background,
    borderRadius: theme.spacing(),
    outline: 'none'
  },
  cardContainer1: {
    backgroundColor: "white",
    borderRadius: 3,
    width: 220,
    padding: 8,
    height: "100%",
    marginRight: 10
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  timeline: {
    transform: "rotate(-90deg)",
    height: 90,
  },
  timelineContentContainer: {
    textAlign: "left"
  },
  timelineContent: {
    display: "inline-block",
    transform: "rotate(90deg)",
    textAlign: "center",
  },
  timelineIcon: {
    transform: "rotate(-90deg)"
  },
  agregarTarea: {
    minHeight: 250,
    width: 250,
    borderRadius: 6
  }
}));

const ProcesoDetalle = ({ proceso, tareas, ...props }) => {
  const classes = useStyles();
  const theme = useTheme();

  const [ state, setState ] = useState({
    agregarTarea: false,
    editarProceso: false,
    producto: proceso.producto,
    nombre: '',
    observaciones: '',
    idTareaAntecesora: null,
    diasAntecesora: 2,
    horasAntecesora: 1,
    minutosAntecesora: 20
  })

  const handleEditAtributos = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setState({
      ...state,
      [name]: value
    });
  }

  const handleHabilitaEditProceso = () => {
    setState({
      ...state,
      editarProceso: !state.editarProceso,
      producto: state.producto === ''
          ? proceso.producto
          : state.producto
    });
  }

  const handleEditarProceso = async (idProceso, event) => {
    if (event.type === 'keypress' && event.charCode !== 13) {
      return
    }

    await props.editarProceso({
      id: idProceso,
      producto: state.producto
    });
    handleHabilitaEditProceso();
  }

  const handleHabilitaAddTarea = () => {
    setState({
      ...state,
      agregarTarea: !state.agregarTarea,
      nombre: '',
      observaciones: ''
    });
  }

  const handleAddTarea = async () => {
    await props.addNewTareaProceso({
      nombre: state.nombre,
      observaciones: state.observaciones,
      idProceso: proceso.id,
      idTareaAntecesora: tareas.length ? tareas[tareas.length - 1].id : null,
      diasAntecesora: tareas.length ? state.diasAntecesora : null,
      horasAntecesora: tareas.length ? state.horasAntecesora : null,
      minutosAntecesora: tareas.length ? state.minutosAntecesora : null
    });
    handleHabilitaAddTarea();
  }

  const renderTitleProceso = () => {
    return (
      state.editarProceso ? (
        <TextField
          autoFocus
          fullWidth
          name = "producto"
          margin = "dense"
          helperText = { !state.producto.length ? 'Debe ingresar el producto' : null }
          error = { !state.producto.length }
          defaultValue = { state.producto }
          inputProps = {{ style: { fontSize: theme.typography.fontSize * 2 } }}
          onChange = { handleEditAtributos }
          onKeyPress = { state.producto.length ? event => handleEditarProceso(proceso.id, event) : handleHabilitaEditProceso }
          onBlur = { state.producto.length ? event => handleEditarProceso(proceso.id, event) : handleHabilitaEditProceso }
          onFocus = { event => event.target.select() }
        />
      ) : (
        <Fragment>
          <Typography variant = "h4" style = {{ marginBottom: theme.spacing(2) }} >
            { proceso.producto }
          </Typography>
          <div>
            <IconButton
              color = "secondary"
              style = {{ marginLeft: theme.spacing()/2, marginTop: - theme.spacing()/2 }}
              onClick = { handleHabilitaEditProceso }
            >
              <EditIcon />
            </IconButton>
          </div>
        </Fragment>
      )
    )
  }

  const renderTimeLine = () => {
    if (!tareas || (tareas && tareas.length <= 1)) {
      return null;
    }

    return (
      <Timeline align = "right" className = { classes.timeline } >
        {
          tareas.map( tarea =>
            <TimelineItem key = { tarea.id } >
              <TimelineOppositeContent >
                <Typography variant="body2" color="textSecondary" className = { classes.timelineContent } >
                  { tarea.proceso_tarea.diasAntecesora
                      ? `${tarea.proceso_tarea.diasAntecesora}D 
                    ${tarea.proceso_tarea.horasAntecesora}H 
                    ${tarea.proceso_tarea.minutosAntecesora}M`
                      : `0D 0H 0M`
                  }
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator >
                <TimelineDot color = "secondary" >
                  <ScheduleIcon />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent />
            </TimelineItem>
          )
        }
      </Timeline>
    )
  }

  const renderAddTareaProceso = () => {
    return (
        <Modal
          open = { state.agregarTarea }
          onClose = { handleHabilitaAddTarea }
          style = {{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className = { classes.paper } >
            <TextField
                autoFocus
                fullWidth
                autoComplete = "off"
                margin = "none"
                name = "nombre"
                variant = "outlined"
                className = { classes.controlEdit }
                defaultValue = { state.nombre }
                onChange = { handleEditAtributos }
                onFocus = { event => event.target.select() }
            />
            <TextField
                multiline
                fullWidth
                rows = {5}
                autoComplete = "off"
                margin = "normal"
                name = "observaciones"
                placeholder = "Observaciones"
                variant = "outlined"
                className = { classes.controlEdit }
                defaultValue = { state.observaciones }
                onChange = { handleEditAtributos }
                onFocus = { event => event.target.select() }
            />
            <div>
              <Button
                  variant = "contained"
                  color = "primary"
                  style = {{ marginTop: 8 }}
                  onClick = { state.nombre.length ? () => handleAddTarea() : null }
              >
                Grabar
              </Button>
            </div>
          </div>
        </Modal>
    )};

  return (
    <div>
      <div className = { classes.root } >
        { renderTitleProceso() }
      </div>

      { renderTimeLine() }

      <div className = { classes.root } >
        {
          tareas.map( tarea =>
            <TareasProcesoList
              key = { tarea.id }
              tarea = { tarea }
              editarTarea = { props.editarTarea }
            />
          )
        }
        <Button className= { classes.agregarTarea } onClick = { handleHabilitaAddTarea } >
          <AddCircleIcon style = {{ marginRight: theme.spacing() }} />Agregar Tarea
        </Button>

        { state.agregarTarea && renderAddTareaProceso()}
      </div>
      <div style={{ marginTop: "10px" }}>
        <Button
          variant = "contained"
          color = "primary"
          size = "large"
          disabled = { !proceso.tareas.length }
        >
          Crear Orden de Produccion
        </Button>
      </div>
    </div>
  );
}

export default ProcesoDetalle;
