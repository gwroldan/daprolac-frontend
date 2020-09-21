import React, {Fragment, useState, useRef} from "react";
import clsx from "clsx";

import { Avatar, Button, Divider, IconButton, Modal, TextField, Typography } from "@material-ui/core";
import { Card, CardHeader, CardActions, Collapse } from "@material-ui/core";
import { List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CodeIcon from '@material-ui/icons/Code';

const INITIAL_ELEVATION = 4;
const TOGGLE_ELEVATION = 4;

const WIDTH_TAREA = 300;

const useStyles = makeStyles(theme => ({
  container: {
    borderRadius: theme.spacing(),
    marginRight: 24,
    width: WIDTH_TAREA,
    height: '100%',
    minHeight: 100,
    cursor: 'pointer'
  },
  paper: {
    position: 'absolute',
    width: WIDTH_TAREA,
    backgroundColor: theme.palette.background,
    borderRadius: theme.spacing(),
    outline: 'none'
  },
  controlEdit: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing()
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
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

const TareasProcesoList = ({ tarea, ...props }) => {
  const classes = useStyles();
  const cardRef = useRef();

  const [ state, setState ] = useState({
    elevation: INITIAL_ELEVATION,
    expanded: tarea.datos.length,
    editarTarea: false,
    nombre: tarea.nombre,
    observaciones: tarea.observaciones
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

  const handleHabilitaEditTarea = () => {
    setState({
      ...state,
      elevation: INITIAL_ELEVATION,
      editarTarea: !state.editarTarea,
      nombre: state.nombre,
      observaciones: state.observaciones
    });
  }

  const handleEditarTarea = async (idTarea) => {
    await props.editarTarea(idTarea, {
      nombre: state.nombre,
      observaciones: state.observaciones
          ? state.observaciones
          : ''
    });
    handleHabilitaEditTarea();
  }

  const handleMouseOver = () => setState({ ...state, elevation: state.elevation * TOGGLE_ELEVATION });
  const handleMouseOut = () => setState({ ...state, elevation: state.elevation / TOGGLE_ELEVATION });
  const handleExpandClick = () => { setState({ ...state, expanded: !state.expanded }); }

  const renderEditTarea = () => {
    return (
      <Modal
        open = { state.editarTarea }
        onClose = { handleHabilitaEditTarea }
        style = { cardRef.current
            ? {
              left: cardRef.current.getBoundingClientRect().left,
              top: cardRef.current.getBoundingClientRect().top
            } : null }
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
              onClick = { state.nombre.length ? () => handleEditarTarea(tarea.id) : null }
            >
              Grabar
            </Button>
          </div>
        </div>
      </Modal>
    )};

  const renderDatosTarea = () => {
    if (!tarea.datos.length) return null;

    return (
      <List dense>
        {
          tarea.datos.map(dato => (
            <ListItem key={dato.id} button >
              <ListItemAvatar>
                <Avatar>
                  <CodeIcon fontSize="small"/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={dato.nombre} secondary={`Tipo: ${dato.tipo}`}/>
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon/>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))
        }
      </List>
    )
  }

  return (
    <Fragment>
      <Card
        className = { classes.container }
        elevation = { state.elevation }
        onMouseOver = { handleMouseOver }
        onMouseOut = { handleMouseOut }
        ref = { cardRef }
      >
        <CardHeader
          action = {
            <IconButton onClick = { handleHabilitaEditTarea } >
              <EditIcon color = "primary"  />
            </IconButton>
          }
          title = {
            <Typography gutterBottom variant = "h6">
              { state.nombre }
            </Typography>
          }
          subheader = {
            <Typography variant = "body2" color = "textSecondary" >
              { state.observaciones }
            </Typography>
          }
        />
        <Divider variant = "middle" light />
        <CardActions disableSpacing >
          <Button size = "small" color = "secondary" variant = "outlined" >
            + Agregar dato
          </Button>
          <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: state.expanded,
              })}
              onClick = { handleExpandClick }
              aria-expanded = { state.expanded }
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in = { state.expanded } timeout="auto" unmountOnExit >
          { renderDatosTarea() }
        </Collapse>
      </Card>

      { state.editarTarea && renderEditTarea() }
    </Fragment>
  )
}

export default TareasProcesoList;
