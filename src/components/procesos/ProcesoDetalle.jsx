import React, { Fragment, useState } from "react";

import { Button, TextField, Typography, useTheme } from "@material-ui/core";
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

const ProcesoDetalle = ({ proceso, ...props }) => {
  const classes = useStyles();
  const theme = useTheme();

  const [ state, setState ] = useState({
    editarProceso: false,
    producto: proceso.producto
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

    await props.editarProceso(idProceso, { producto: state.producto });
    handleHabilitaEditProceso();
  }

  const renderTimeLine = () => {
    if (!proceso.tareas || (proceso.tareas && proceso.tareas.length <= 1)) {
      return null;
    }

    return (
      <Timeline align = "right" className = { classes.timeline } >
        {
          proceso.tareas.map( tarea =>
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

  return (
    <div>
      <div className = { classes.root } >
        {
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
        }
      </div>

      { renderTimeLine() }

      <div className = { classes.root } >
        {
          proceso.tareas.map( tarea =>
            <TareasProcesoList
              key = { tarea.id }
              tarea = { tarea }
              editarTarea = { props.editarTarea }
            />
          )
        }
        <Button className= { classes.agregarTarea } >
          <AddCircleIcon style = {{ marginRight: theme.spacing() }} />Agregar Tarea
        </Button>
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
