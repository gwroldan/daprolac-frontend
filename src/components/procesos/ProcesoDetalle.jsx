import React, { Fragment } from "react";

import { Button, FormControl, FormControlLabel, Grid, InputLabel, TextField, Typography } from "@material-ui/core";
import { Accordion, AccordionSummary, AccordionDetails, Card, CardContent, Checkbox, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import MenuItem from "@material-ui/core/MenuItem";
import DeleteIcon from "@material-ui/icons/Delete";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1
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
  }
}));

const ProcesoDetalle = ({ proceso, state, ...props }) => {
  const classes = useStyles();

  return (
    <div>
      <div className = { classes.root } >
        {
          state.editarProceso ? (
            <TextField
              label = "Producto"
              name = "producto"
              margin = "dense"
              error = { !state.producto.length }
              defaultValue = { state.producto }
              autoFocus
              onChange = { props.handleEditAtributos }
              onKeyPress = { event => props.handleEditarProceso(proceso.id, event) }
              onBlur = { event => props.handleEditarProceso(proceso.id, event) }
              onFocus = { event => event.target.select() }
            />
          ) : (
            <Fragment>
              <div>
                <Typography
                  style={{ marginBottom: "10px" }}
                  variant="h4"
                >
                  { proceso.producto }
                </Typography>
              </div>
              <div>
                <IconButton
                  color = "secondary"
                  style={{ marginLeft: 8, marginTop: -8 }}
                  onClick = { props.handleHabilitaEditProceso }
                >
                  <EditIcon />
                </IconButton>
              </div>
            </Fragment>
          )
        }
      </div>
      {/*<div>*/}
      {/*  {*/}
      {/*    state.DataProcesos[0].tareas.map((t,i) => {*/}
      {/*      if(t.proceso_tarea.idTareaAntecesora == null && i !== 0) {*/}
      {/*        return (*/}
      {/*          <div key={i}>*/}
      {/*            <h4 style={{color:"red"}}>{t.nombre} SIN ASIGNAR</h4>*/}
      {/*          </div>*/}
      {/*        )*/}
      {/*      }*/}
      {/*      return null*/}
      {/*    })*/}
      {/*  }*/}
      {/*</div>*/}
      {/*<div style={{ display: "flex" }} >*/}
      {/*  {*/}
      {/*    props.ordenarTareas(state.DataProcesos[0].tareas*/}
      {/*      .sort(*/}
      {/*        (a, b) =>*/}
      {/*            a.proceso_tarea.idTareaAntecesora -*/}
      {/*            b.proceso_tarea.idTareaAntecesora*/}
      {/*      ))*/}

      {/*      .map((tarea, index) => (*/}
      {/*        <Fragment key={index}>*/}
      {/*          <div style={classes.container}>*/}
      {/*            <div className={classes.root}>*/}
      {/*              <Grid container spacing={1}>*/}
      {/*                <Grid item xs={10}>*/}
      {/*                  {*/}
      {/*                    state.editVisibles[tarea.id] ? (*/}
      {/*                      <div>*/}
      {/*                        {*/}
      {/*                          index !== 0 ? (*/}
      {/*                            <form*/}
      {/*                              onSubmit={e =>*/}
      {/*                                props.editarTareaConIdAntecesora(*/}
      {/*                                  tarea.id,*/}
      {/*                                  e,*/}
      {/*                                  state.DataProcesos[0].id,*/}
      {/*                                  state.idTareaAnterior*/}
      {/*                                  //tarea.proceso_tarea.idTareaAntecesora*/}
      {/*                                )*/}
      {/*                              }*/}
      {/*                            >*/}
      {/*                              <div>*/}
      {/*                                <div>*/}
      {/*                                  <TextField*/}
      {/*                                    id={tarea.id}*/}
      {/*                                    style={{ width: "100%" }}*/}
      {/*                                    label="Nombre"*/}
      {/*                                    variant="outlined"*/}
      {/*                                    placeholder={tarea.nombre}*/}
      {/*                                    onChange={props.handleEditAtributos}*/}
      {/*                                    type="text"*/}
      {/*                                    size="small"*/}
      {/*                                    name="nombre"*/}
      {/*                                    defaultValue={tarea.nombre}*/}
      {/*                                    autoFocus*/}
      {/*                                  />*/}
      {/*                                </div>*/}
      {/*                                <div>*/}
      {/*                                  <TextField*/}
      {/*                                    style={{ marginTop: 8, width: "100%" }}*/}
      {/*                                    id={tarea.id}*/}
      {/*                                    label="Observaciones"*/}
      {/*                                    variant="outlined"*/}
      {/*                                    size="small"*/}
      {/*                                    placeholder={tarea.observaciones}*/}
      {/*                                    onChange={props.handleEditAtributos}*/}
      {/*                                    type="text"*/}
      {/*                                    name="observaciones"*/}
      {/*                                    defaultValue={tarea.observaciones}*/}
      {/*                                  />*/}
      {/*                                </div>*/}
      {/*                                <div>*/}
      {/*                                  <FormControl*/}
      {/*                                    style={{*/}
      {/*                                      width: "100%",*/}
      {/*                                      height: 50,*/}
      {/*                                      marginTop: 8*/}
      {/*                                    }}*/}
      {/*                                    variant="outlined"*/}
      {/*                                    size="small"*/}
      {/*                                  >*/}
      {/*                                    <InputLabel*/}
      {/*                                      style={{ width: "120%" }}*/}
      {/*                                      id="demo-simple-select-outlined-label"*/}
      {/*                                    >*/}
      {/*                                      Tarea Antecesora*/}
      {/*                                    </InputLabel>*/}
      {/*                                    <Select*/}
      {/*                                      labelId="demo-simple-select-filled-label"*/}
      {/*                                      id="demo-simple-select-filled"*/}
      {/*                                      label="Tareas"*/}
      {/*                                      size="small"*/}
      {/*                                      defaultValue = { tarea.proceso_tarea.idTareaAntecesora }*/}
      {/*                                      onChange = { props.handleSelectChange }*/}
      {/*                                    >*/}
      {/*                                      {*/}
      {/*                                        props.filtrarTareas(state.DataProcesos[0].tareas.filter(*/}
      {/*                                            tareaAnterior => tareaAnterior.id !== tarea.id ),*/}
      {/*                                            tarea.proceso_tarea.idTareaAntecesora)*/}
      {/*                                          .map((tareaAnterior) => (*/}
      {/*                                            <MenuItem value={tareaAnterior.id}>*/}
      {/*                                              {tareaAnterior.nombre}*/}
      {/*                                            </MenuItem>*/}
      {/*                                          ))}*/}
      {/*                                    </Select>*/}
      {/*                                  </FormControl>*/}
      {/*                                  <div*/}
      {/*                                    style={{*/}
      {/*                                      display: "flex",*/}
      {/*                                      marginTop: 10,*/}
      {/*                                      justifyContent: "space-around"*/}
      {/*                                    }}*/}
      {/*                                  >*/}
      {/*                                    <div>*/}
      {/*                                      <TextField*/}
      {/*                                        style={{*/}
      {/*                                          marginRight: 5*/}
      {/*                                        }}*/}
      {/*                                        id="diasAntecesora"*/}
      {/*                                        label="dias"*/}
      {/*                                        variant="outlined"*/}
      {/*                                        type="number"*/}
      {/*                                        name="diasAntecesora"*/}
      {/*                                        size="small"*/}
      {/*                                        onChange={props.handleEditAtributos}*/}
      {/*                                        defaultValue={*/}
      {/*                                          tarea.proceso_tarea.diasAntecesora*/}
      {/*                                        }*/}
      {/*                                        //onBlur={props.componentHideAndShow}*/}
      {/*                                      />*/}
      {/*                                    </div>*/}
      {/*                                    <div>*/}
      {/*                                      <TextField*/}
      {/*                                        style={{*/}
      {/*                                          marginRight: 5*/}
      {/*                                        }}*/}
      {/*                                        id="horasAntecesora"*/}
      {/*                                        label="horas"*/}
      {/*                                        variant="outlined"*/}
      {/*                                        type="number"*/}
      {/*                                        name="horasAntecesora"*/}
      {/*                                        size="small"*/}
      {/*                                        onChange={props.handleEditAtributos}*/}
      {/*                                        defaultValue={*/}
      {/*                                          tarea.proceso_tarea.horasAntecesora*/}
      {/*                                        }*/}
      {/*                                        //onBlur={props.componentHideAndShow}*/}
      {/*                                      />*/}
      {/*                                    </div>*/}
      {/*                                    <div>*/}
      {/*                                      <TextField*/}
      {/*                                        style={{*/}
      {/*                                          width: "100%"*/}
      {/*                                        }}*/}
      {/*                                        id="minutosAntecesora"*/}
      {/*                                        label="minutos"*/}
      {/*                                        variant="outlined"*/}
      {/*                                        type="number"*/}
      {/*                                        name="minutosAntecesora"*/}
      {/*                                        size="small"*/}
      {/*                                        onChange={props.handleEditAtributos}*/}
      {/*                                        defaultValue={*/}
      {/*                                          tarea.proceso_tarea*/}
      {/*                                              .minutosAntecesora*/}
      {/*                                        }*/}
      {/*                                        //onBlur={props.componentHideAndShow}*/}
      {/*                                      />*/}
      {/*                                    </div>*/}
      {/*                                  </div>*/}
      {/*                                </div>*/}

      {/*                                <div*/}
      {/*                                  style={{*/}
      {/*                                    display: "flex",*/}
      {/*                                    marginTop: 8*/}
      {/*                                  }}*/}
      {/*                                >*/}
      {/*                                  <Button*/}
      {/*                                    variant = "outlined"*/}
      {/*                                    onClick = {e => props.showEditDiv(tarea.id, e) }*/}
      {/*                                  >*/}
      {/*                                    Cancelar*/}
      {/*                                  </Button>*/}
      {/*                                  <Button*/}
      {/*                                    style={{ marginLeft: 8 }}*/}
      {/*                                    variant="outlined"*/}
      {/*                                    type="submit"*/}
      {/*                                  >*/}
      {/*                                    Editar Tarea*/}
      {/*                                  </Button>*/}
      {/*                                </div>*/}
      {/*                              </div>*/}
      {/*                            </form>*/}
      {/*                          ) : (*/}
      {/*                            <form onSubmit = { e => props.editarTarea(tarea.id, e) } >*/}
      {/*                              <div>*/}
      {/*                                <div>*/}
      {/*                                  <TextField*/}
      {/*                                    id={tarea.id}*/}
      {/*                                    style={{ width: "100%" }}*/}
      {/*                                    label="Nombre"*/}
      {/*                                    variant="outlined"*/}
      {/*                                    placeholder={tarea.nombre}*/}
      {/*                                    onChange={props.handleEditAtributos}*/}
      {/*                                    type="text"*/}
      {/*                                    size="small"*/}
      {/*                                    name="nombre"*/}
      {/*                                    defaultValue={tarea.nombre}*/}
      {/*                                    autoFocus*/}
      {/*                                  />*/}
      {/*                                </div>*/}
      {/*                                <div>*/}
      {/*                                  <TextField*/}
      {/*                                    style={{ marginTop: 8, width: "100%" }}*/}
      {/*                                    id={tarea.id}*/}
      {/*                                    label="Observaciones"*/}
      {/*                                    variant="outlined"*/}
      {/*                                    size="small"*/}
      {/*                                    placeholder={tarea.observaciones}*/}
      {/*                                    onChange={props.handleEditAtributos}*/}
      {/*                                    type="text"*/}
      {/*                                    defaultValue={tarea.observaciones}*/}
      {/*                                    name="observaciones"*/}
      {/*                                  />*/}
      {/*                                </div>*/}

      {/*                                <div style={{ display: "flex", marginTop: 8 }} >*/}
      {/*                                  <Button*/}
      {/*                                    variant="outlined"*/}
      {/*                                    onClick={e => props.showEditDiv(tarea.id, e)}*/}
      {/*                                  >*/}
      {/*                                    Cancelar*/}
      {/*                                  </Button>*/}
      {/*                                  <Button*/}
      {/*                                      style={{ marginLeft: 8 }}*/}
      {/*                                      variant="outlined"*/}
      {/*                                      type="submit"*/}
      {/*                                  >*/}
      {/*                                    Editar Tarea*/}
      {/*                                  </Button>*/}
      {/*                                </div>*/}
      {/*                              </div>*/}
      {/*                            </form>*/}
      {/*                          )*/}
      {/*                        }*/}
      {/*                      </div>*/}
      {/*                    ) : (*/}
      {/*                      <div>*/}
      {/*                        <h4>Nombre: {tarea.nombre}</h4>*/}
      {/*                        <h4>Observacion: {tarea.observaciones}</h4>*/}
      {/*                        <h4> {tarea.id} </h4>*/}
      {/*                        {*/}
      {/*                          tarea.proceso_tarea.idTareaAntecesora == null ? (*/}
      {/*                            <div></div>*/}
      {/*                          ) : (*/}
      {/*                            <div>*/}
      {/*                              {*/}
      {/*                                state.DataProcesos[0].tareas.map((tarAnt,index) => {*/}
      {/*                                  if (tarea.proceso_tarea.idTareaAntecesora == tarAnt.id) {*/}
      {/*                                    return(*/}
      {/*                                      <div key={index}>*/}
      {/*                                        <h4>*/}
      {/*                                          Tarea Antecesora:{tarAnt.nombre}*/}
      {/*                                        </h4>*/}
      {/*                                        <h4>*/}
      {/*                                          Id Tarea Antecesora: {tarea.proceso_tarea.idTareaAntecesora}*/}
      {/*                                        </h4>*/}
      {/*                                      </div>*/}
      {/*                                    );*/}
      {/*                                  }*/}
      {/*                                  return null*/}
      {/*                                })*/}
      {/*                              }*/}

      {/*                              <Grid container spacing={3}>*/}
      {/*                                <Grid item xs={6}>*/}
      {/*                                  <h4>*/}
      {/*                                    Dias: {tarea.proceso_tarea.diasAntecesora}{" "}*/}
      {/*                                  </h4>*/}
      {/*                                </Grid>*/}
      {/*                                <Grid item xs={3}>*/}
      {/*                                  <div style={{ display: "flex" }}>*/}
      {/*                                    <h4>*/}
      {/*                                      {tarea.proceso_tarea.horasAntecesora}:*/}
      {/*                                    </h4>*/}
      {/*                                    <h4>*/}
      {/*                                      {tarea.proceso_tarea.minutosAntecesora}{" "}*/}
      {/*                                    </h4>*/}
      {/*                                    {tarea.proceso_tarea.horasAntecesora >=*/}
      {/*                                    12 ? (*/}
      {/*                                        <h4> pm</h4>*/}
      {/*                                    ) : (*/}
      {/*                                        <h4> am</h4>*/}
      {/*                                    )}*/}
      {/*                                  </div>*/}
      {/*                                </Grid>*/}
      {/*                              </Grid>*/}
      {/*                            </div>*/}
      {/*                          )*/}
      {/*                        }*/}
      {/*                      </div>*/}
      {/*                  )}*/}
      {/*                </Grid>*/}
      {/*                <Grid style={{ marginTop: 2 }} item xs={2}>*/}
      {/*                  <div>*/}
      {/*                    <IconButton onClick = { e => props.showEditDiv(tarea.id, e) } >*/}
      {/*                      <EditIcon style={{ color: "green" }} />*/}
      {/*                    </IconButton>*/}
      {/*                  </div>*/}
      {/*                  <div>*/}
      {/*                    <IconButton onClick={e => props.borrarTarea(tarea.id, e)} >*/}
      {/*                      <DeleteIcon style={{ marginTop: 1 }} color="secondary" />*/}
      {/*                    </IconButton>*/}
      {/*                  </div>*/}
      {/*                </Grid>*/}
      {/*              </Grid>*/}
      {/*            </div>*/}

      {/*            {*/}
      {/*              tarea.datos.map(dato => (*/}
      {/*                <Fragment key={dato.id}>*/}
      {/*                  <div style={{ marginTop: 8 }}>*/}
      {/*                    <Grid container spacing={1}>*/}
      {/*                      <Grid item xs={10}>*/}
      {/*                        {*/}
      {/*                          state.editVisibles[dato.id] ? (*/}
      {/*                            <div>*/}
      {/*                              <Card>*/}
      {/*                                <CardContent style = { classes.cardContainer1 } >*/}
      {/*                                  <form*/}
      {/*                                    onSubmit = { e => props.editarDato(tarea.id,dato.id, e) }*/}
      {/*                                    onChange = { props.handleChangeInput2 }*/}
      {/*                                  >*/}
      {/*                                    <div>*/}
      {/*                                      <div>*/}
      {/*                                        <TextField*/}
      {/*                                          id={dato.id}*/}
      {/*                                          label="Nombre"*/}
      {/*                                          variant="outlined"*/}
      {/*                                          placeholder={dato.nombre}*/}
      {/*                                          onChange={props.handleEditAtributos}*/}
      {/*                                          type="text"*/}
      {/*                                          name="nombre"*/}
      {/*                                          defaultValue={dato.nombre}*/}
      {/*                                          autoFocus*/}
      {/*                                        />*/}
      {/*                                      </div>*/}
      {/*                                      <div>*/}
      {/*                                        <TextField*/}
      {/*                                          style={{ marginTop: 8 }}*/}
      {/*                                          id={dato.id}*/}
      {/*                                          label="Unidad"*/}
      {/*                                          variant="outlined"*/}
      {/*                                          placeholder={dato.unidadMedida}*/}
      {/*                                          onChange={props.handleEditAtributos}*/}
      {/*                                          type="text"*/}
      {/*                                          name="unidadMedida"*/}
      {/*                                          defaultValue={dato.unidadMedida}*/}
      {/*                                        />*/}
      {/*                                      </div>*/}
      {/*                                      <div>*/}
      {/*                                        <FormControl*/}
      {/*                                          style={{*/}
      {/*                                            width: "100%",*/}
      {/*                                            height: 50,*/}
      {/*                                            marginTop: 8*/}
      {/*                                          }}*/}
      {/*                                          variant="outlined"*/}
      {/*                                        >*/}
      {/*                                          <InputLabel*/}
      {/*                                            style={{ width: "120%" }}*/}
      {/*                                            id="demo-simple-select-outlined-label"*/}
      {/*                                          >*/}
      {/*                                            Tipo*/}
      {/*                                          </InputLabel>*/}
      {/*                                          <Select*/}
      {/*                                            labelId="demo-simple-select-filled-label"*/}
      {/*                                            id="demo-simple-select-filled"*/}
      {/*                                            label="Tipo"*/}
      {/*                                            size="small"*/}
      {/*                                            defaultValue={dato.tipo}*/}
      {/*                                            onChange={ props.handleSelectChange1 }*/}
      {/*                                          >*/}
      {/*                                            <MenuItem value={"numero"} key={0} >*/}
      {/*                                              numero*/}
      {/*                                            </MenuItem>*/}
      {/*                                            <MenuItem value={"cadena"} key={1} >*/}
      {/*                                              cadena*/}
      {/*                                            </MenuItem>*/}
      {/*                                            <MenuItem value={"opcion"} key={2} >*/}
      {/*                                              opcion*/}
      {/*                                            </MenuItem>*/}
      {/*                                          </Select>*/}
      {/*                                        </FormControl>*/}
      {/*                                      </div>*/}

      {/*                                      {*/}
      {/*                                        state.tipo === "opcion" ? (*/}
      {/*                                          <div>*/}
      {/*                                            {*/}
      {/*                                              dato.opciones.length > 0 ? (*/}
      {/*                                                <div>*/}
      {/*                                                  {*/}
      {/*                                                    dato.opciones.map((opcion,indx) => (*/}
      {/*                                                      <div key={indx} >*/}
      {/*                                                        <TextField*/}
      {/*                                                          id={indx}*/}
      {/*                                                          name="valor"*/}
      {/*                                                          type="text"*/}
      {/*                                                          label="Valor"*/}
      {/*                                                          defaultValue={opcion.valor}*/}
      {/*                                                          placeholder="Valor"*/}
      {/*                                                          variant="outlined"*/}
      {/*                                                          //onChange={(e) => props.handleChangeInput2(indx,e)}*/}
      {/*                                                        />*/}
      {/*                                                      </div>*/}
      {/*                                                    ))*/}
      {/*                                                  }*/}
      {/*                                                </div>*/}
      {/*                                              ) : null*/}
      {/*                                            }*/}

      {/*                                            {*/}
      {/*                                              state.opciones.map((op, index)=> (*/}
      {/*                                                <Fragment key={`${op}~${index}`} >*/}
      {/*                                                  <div>*/}
      {/*                                                    <TextField*/}
      {/*                                                      id="valor"*/}
      {/*                                                      name="valor"*/}
      {/*                                                      type="text"*/}
      {/*                                                      label="Valor"*/}
      {/*                                                      value={op.valor}*/}
      {/*                                                      placeholder="Valor"*/}
      {/*                                                      variant="outlined"*/}
      {/*                                                      onChange={(e) => props.handleChangeInput(index,e)}*/}
      {/*                                                    />*/}
      {/*                                                    <IconButton onClick={() => props.handleRemoveFields(index)} >*/}
      {/*                                                      <RemoveIcon />*/}
      {/*                                                    </IconButton>*/}
      {/*                                                    <IconButton onClick={() => props.handleAddFields()} >*/}
      {/*                                                      <AddIcon />*/}
      {/*                                                    </IconButton>*/}
      {/*                                                  </div>*/}
      {/*                                                </Fragment>*/}
      {/*                                              ))*/}
      {/*                                            }*/}
      {/*                                          </div>*/}
      {/*                                        ) : null*/}
      {/*                                      }*/}

      {/*                                      {*/}
      {/*                                        state.tipo === "numero" ? (*/}
      {/*                                          <div>*/}
      {/*                                            <div>*/}
      {/*                                              <TextField*/}
      {/*                                                style={{ marginTop: 8 }}*/}
      {/*                                                id={dato.id}*/}
      {/*                                                label="Minimo"*/}
      {/*                                                variant="outlined"*/}
      {/*                                                placeholder={dato.minimo}*/}
      {/*                                                onChange={props.handleEditAtributos}*/}
      {/*                                                defaultValue={dato.minimo}*/}
      {/*                                                type="number"*/}
      {/*                                                name="minimo"*/}
      {/*                                              />*/}
      {/*                                            </div>*/}
      {/*                                            <div>*/}
      {/*                                              <TextField*/}
      {/*                                                style={{ marginTop: 8 }}*/}
      {/*                                                id={dato.id}*/}
      {/*                                                label="Maximo"*/}
      {/*                                                variant="outlined"*/}
      {/*                                                placeholder={dato.maximo}*/}
      {/*                                                onChange={props.handleEditAtributos}*/}
      {/*                                                defaultValue={dato.maximo}*/}
      {/*                                                type="number"*/}
      {/*                                                name="maximo"*/}
      {/*                                              />*/}
      {/*                                            </div>*/}
      {/*                                          </div>*/}
      {/*                                        ) : null*/}
      {/*                                      }*/}

      {/*                                      <div>*/}
      {/*                                        <FormControlLabel*/}
      {/*                                          control={*/}
      {/*                                            <Checkbox*/}
      {/*                                              checked={state.obligatorio}*/}
      {/*                                              onChange={props.handleEditAtributos}*/}
      {/*                                              value={dato.tarea_dato.obligatorio}*/}
      {/*                                              name="obligatorio"*/}
      {/*                                              color="primary"*/}
      {/*                                            />*/}
      {/*                                          }*/}
      {/*                                          label="Obligatorio"*/}
      {/*                                        />*/}
      {/*                                      </div>*/}

      {/*                                      <div style={{display: "flex", marginTop: 8}} >*/}
      {/*                                        <Button*/}
      {/*                                          variant="outlined"*/}
      {/*                                          onClick={ e => props.showEditDiv(dato.id, e) }*/}
      {/*                                        >*/}
      {/*                                          Cancelar*/}
      {/*                                        </Button>*/}
      {/*                                        <Button*/}
      {/*                                          style={{ marginLeft: 8 }}*/}
      {/*                                          variant="outlined"*/}
      {/*                                          type="submit"*/}
      {/*                                        >*/}
      {/*                                          Editar Dato*/}
      {/*                                        </Button>*/}
      {/*                                      </div>*/}
      {/*                                    </div>*/}
      {/*                                  </form>*/}
      {/*                                </CardContent>*/}
      {/*                              </Card>*/}
      {/*                            </div>*/}
      {/*                          ) : (*/}
      {/*                            <Card>*/}
      {/*                              <CardContent style = { classes.cardContainer1 } >*/}
      {/*                                <Accordion>*/}
      {/*                                  <AccordionSummary*/}
      {/*                                    expandIcon = { <ExpandMoreIcon /> }*/}
      {/*                                    aria-controls="panel1bh-content"*/}
      {/*                                    id="panel1bh-header"*/}
      {/*                                  >*/}
      {/*                                    <Typography className = { classes.heading } >nombre:</Typography>*/}
      {/*                                    <Typography className = { classes.secondaryHeading } >{ dato.nombre }</Typography>*/}
      {/*                                  </AccordionSummary>*/}

      {/*                                  <AccordionDetails>*/}
      {/*                                    <Typography className = { classes.heading } >unidad:</Typography>*/}
      {/*                                    <Typography className = { classes.secondaryHeading } >{ dato.unidadMedida }</Typography>*/}
      {/*                                  </AccordionDetails>*/}
      {/*                                  <AccordionDetails>*/}
      {/*                                    <Typography className = { classes.heading } >tipo:</Typography>*/}
      {/*                                    <Typography className = { classes.secondaryHeading } >{dato.tipo}</Typography>*/}
      {/*                                  </AccordionDetails>*/}

      {/*                                  {*/}
      {/*                                    dato.tipo === "opcion" ? (*/}
      {/*                                      <div>*/}
      {/*                                        {*/}
      {/*                                          dato.opciones.map((opcion,index) => (*/}
      {/*                                            <AccordionDetails>*/}
      {/*                                              <Typography className = { classes.heading } >valor { index + 1 }:</Typography>*/}
      {/*                                              <Typography className = { classes.secondaryHeading } >{ opcion.valor }</Typography>*/}
      {/*                                            </AccordionDetails>*/}
      {/*                                          ))*/}
      {/*                                        }*/}
      {/*                                      </div>*/}
      {/*                                    ) : null*/}
      {/*                                  }*/}

      {/*                                  {*/}
      {/*                                    dato.tipo === "numero" ? (*/}
      {/*                                      <div>*/}
      {/*                                        <AccordionDetails>*/}
      {/*                                          <Typography className = { classes.heading } >minimo:</Typography>*/}
      {/*                                          <Typography className = { classes.secondaryHeading } >{ dato.minimo }</Typography>*/}
      {/*                                        </AccordionDetails>*/}
      {/*                                        <AccordionDetails>*/}
      {/*                                          <Typography className = { classes.heading } >maximo:</Typography>*/}
      {/*                                          <Typography className = { classes.secondaryHeading } >{ dato.maximo }</Typography>*/}
      {/*                                        </AccordionDetails>*/}
      {/*                                      </div>*/}
      {/*                                    ) :null*/}
      {/*                                  }*/}

      {/*                                  <AccordionDetails>*/}
      {/*                                    <div>*/}
      {/*                                      <FormControlLabel*/}
      {/*                                        disabled*/}
      {/*                                        label = "Obligatorio"*/}
      {/*                                        control = {*/}
      {/*                                          <Checkbox*/}
      {/*                                            checked={dato.tarea_dato.obligatorio}*/}
      {/*                                            onChange={props.handleEditAtributos}*/}
      {/*                                            name="obligatorio"*/}
      {/*                                            color="primary"*/}
      {/*                                          />*/}
      {/*                                        }*/}
      {/*                                      />*/}
      {/*                                    </div>*/}
      {/*                                  </AccordionDetails>*/}
      {/*                                </Accordion>*/}
      {/*                              </CardContent>*/}
      {/*                            </Card>*/}
      {/*                          )*/}
      {/*                        }*/}
      {/*                      </Grid>*/}
      {/*                      <Grid style={{ marginTop: -4 }} item xs={2}>*/}
      {/*                        <div>*/}
      {/*                          <IconButton onClick={e => props.showEditDiv(dato.id, e)} >*/}
      {/*                            <EditIcon style={{ color: "green" }} />*/}
      {/*                          </IconButton>*/}
      {/*                        </div>*/}
      {/*                        <div>*/}
      {/*                          <IconButton*/}
      {/*                            onClick={e => props.borrarDato(*/}
      {/*                                state.DataProcesos[0].id,*/}
      {/*                                dato.id,*/}
      {/*                                e*/}
      {/*                              )*/}
      {/*                            }*/}
      {/*                          >*/}
      {/*                            <DeleteIcon color="secondary" style={{ marginTop: 1 }} />*/}
      {/*                          </IconButton>*/}
      {/*                        </div>*/}
      {/*                      </Grid>*/}
      {/*                    </Grid>*/}
      {/*                  </div>*/}
      {/*                </Fragment>*/}
      {/*              ))*/}
      {/*            }*/}

      {/*            {*/}
      {/*              state.editVisibles1[tarea.id] ? (*/}
      {/*                <Card style={{ marginTop: 10, width: "83%" }}>*/}
      {/*                  <CardContent className = {classes.cardContainer1} >*/}
      {/*                    <form onSubmit = { e => props.crearDato(tarea.id, e, index) } >*/}
      {/*                      <div>*/}
      {/*                        <div>*/}
      {/*                          <TextField*/}
      {/*                            id="nombre"*/}
      {/*                            label="Nombre"*/}
      {/*                            variant="outlined"*/}
      {/*                            placeholder="Nombre"*/}
      {/*                            onChange={props.handleEditAtributos}*/}
      {/*                            type="text"*/}
      {/*                            name="nombre"*/}
      {/*                            autoFocus*/}
      {/*                          />*/}
      {/*                        </div>*/}
      {/*                        <div>*/}
      {/*                          <TextField*/}
      {/*                            style={{ marginTop: 8 }}*/}
      {/*                            id="unidadMedida"*/}
      {/*                            label="Unidad"*/}
      {/*                            variant="outlined"*/}
      {/*                            placeholder="Unidad"*/}
      {/*                            onChange={props.handleEditAtributos}*/}
      {/*                            type="text"*/}
      {/*                            name="unidadMedida"*/}
      {/*                          />*/}
      {/*                        </div>*/}
      {/*                        <div>*/}
      {/*                          <FormControl*/}
      {/*                            style={{*/}
      {/*                              width: "100%",*/}
      {/*                              height: 50,*/}
      {/*                              marginTop: 8*/}
      {/*                            }}*/}
      {/*                            variant="outlined"*/}
      {/*                          >*/}
      {/*                            <InputLabel*/}
      {/*                              style={{ width: "120%" }}*/}
      {/*                              id="demo-simple-select-outlined-label"*/}
      {/*                            >*/}
      {/*                              Tipo*/}
      {/*                            </InputLabel>*/}
      {/*                            <Select*/}
      {/*                              labelId="demo-simple-select-filled-label"*/}
      {/*                              id="demo-simple-select-filled"*/}
      {/*                              label="Tipo"*/}
      {/*                              size="small"*/}
      {/*                              value={state.tipo}*/}
      {/*                              onChange={props.handleSelectChange1}*/}
      {/*                            >*/}
      {/*                              <MenuItem value={"numero"} key={0}>numero</MenuItem>*/}
      {/*                              <MenuItem value={"cadena"} key={1}>cadena</MenuItem>*/}
      {/*                              <MenuItem value={"opcion"} key={2}>opcion</MenuItem>*/}
      {/*                            </Select>*/}
      {/*                          </FormControl>*/}
      {/*                        </div>*/}
      {/*                        {*/}
      {/*                          state.tipo === "opcion" ? (*/}
      {/*                            <div>*/}
      {/*                              {*/}
      {/*                                state.opciones.map((opcion, index) => (*/}
      {/*                                  <Fragment key={`${opcion}~${index}`}>*/}
      {/*                                    <div >*/}
      {/*                                      <TextField*/}
      {/*                                        id="valor"*/}
      {/*                                        name="valor"*/}
      {/*                                        type="text"*/}
      {/*                                        label="Valor"*/}
      {/*                                        value={opcion.valor}*/}
      {/*                                        placeholder="Valor"*/}
      {/*                                        variant="outlined"*/}
      {/*                                        onChange={(e) => props.handleChangeInput(index,e)}*/}
      {/*                                      />*/}
      {/*                                      <IconButton onClick={() => props.handleRemoveFields(index)} >*/}
      {/*                                        <RemoveIcon />*/}
      {/*                                      </IconButton>*/}
      {/*                                      <IconButton onClick={() => props.handleAddFields()} >*/}
      {/*                                        <AddIcon />*/}
      {/*                                      </IconButton>*/}
      {/*                                    </div>*/}
      {/*                                  </Fragment>*/}
      {/*                                ))*/}
      {/*                              }*/}
      {/*                            </div>*/}
      {/*                          ) : null*/}
      {/*                        }*/}

      {/*                        {*/}
      {/*                          state.tipo === "numero" ? (*/}
      {/*                            <div>*/}
      {/*                              <div>*/}
      {/*                                <TextField*/}
      {/*                                  style={{ marginTop: 14 }}*/}
      {/*                                  id="minimo"*/}
      {/*                                  label="Minimo"*/}
      {/*                                  variant="outlined"*/}
      {/*                                  placeholder="Minimo"*/}
      {/*                                  onChange={props.handleEditAtributos}*/}
      {/*                                  type="number"*/}
      {/*                                  name="minimo"*/}
      {/*                                />*/}
      {/*                              </div>*/}
      {/*                              <div>*/}
      {/*                                <TextField*/}
      {/*                                  style={{ marginTop: 8 }}*/}
      {/*                                  id="maximo"*/}
      {/*                                  label="Maximo"*/}
      {/*                                  variant="outlined"*/}
      {/*                                  placeholder="Maximo"*/}
      {/*                                  onChange={props.handleEditAtributos}*/}
      {/*                                  type="number"*/}
      {/*                                  name="maximo"*/}
      {/*                                />*/}
      {/*                              </div>*/}
      {/*                            </div>*/}
      {/*                          ) : null*/}
      {/*                        }*/}

      {/*                        <FormControlLabel*/}
      {/*                          control={*/}
      {/*                            <Checkbox*/}
      {/*                              checked={state.obligatorio}*/}
      {/*                              onChange={props.handleEditAtributos}*/}
      {/*                              name="obligatorio"*/}
      {/*                              color="primary"*/}
      {/*                            />*/}
      {/*                          }*/}
      {/*                          label="Obligatorio"*/}
      {/*                        />*/}
      {/*                        <div style={{ display: "flex", marginTop: 8 }}>*/}
      {/*                          <Button*/}
      {/*                            style={{}}*/}
      {/*                            variant="outlined"*/}
      {/*                            onClick={e => props.showEditDiv1(tarea.id, e)}*/}
      {/*                          >*/}
      {/*                            Cancelar*/}
      {/*                          </Button>*/}
      {/*                          <Button*/}
      {/*                            style={{ marginLeft: 8 }}*/}
      {/*                            variant="outlined"*/}
      {/*                            type="submit"*/}
      {/*                          >*/}
      {/*                            Agregar Dato*/}
      {/*                          </Button>*/}
      {/*                        </div>*/}
      {/*                      </div>*/}
      {/*                    </form>*/}
      {/*                  </CardContent>*/}
      {/*                </Card>*/}
      {/*              ) : (*/}
      {/*                <div>*/}
      {/*                  <Button*/}
      {/*                    style={{ width: "100%" }}*/}
      {/*                    onClick={e => props.showEditDiv1(tarea.id, e)}*/}
      {/*                  >*/}
      {/*                    <AddIcon/>Agregar dato*/}
      {/*                  </Button>*/}
      {/*                </div>*/}
      {/*              )*/}
      {/*            }*/}
      {/*          </div>*/}
      {/*        </Fragment>*/}
      {/*      ))*/}
      {/*  }*/}

      {/*  {*/}
      {/*    state.editVisibles[state.DataProcesos[0].id] ? (*/}
      {/*      <div>*/}
      {/*        <form onSubmit = {e => props.crearTarea(state.DataProcesos[0].id, e)} >*/}
      {/*          <div style={{ width: "100%" }}>*/}
      {/*            <div>*/}
      {/*              <TextField*/}
      {/*                id="nombre"*/}
      {/*                label="Tarea"*/}
      {/*                variant="outlined"*/}
      {/*                type="text"*/}
      {/*                name="nombre"*/}
      {/*                size="small"*/}
      {/*                autoFocus*/}
      {/*                onChange={props.handleEditAtributos}*/}
      {/*              />*/}
      {/*            </div>*/}
      {/*            <div style={{ width: "80%", display: "flex", marginTop: 15 }} >*/}
      {/*              <Button*/}
      {/*                style={{}}*/}
      {/*                variant="outlined"*/}
      {/*                onClick={e =>props.showEditDiv(state.DataProcesos[0].id, e)}*/}
      {/*              >*/}
      {/*                Cancelar*/}
      {/*              </Button>*/}
      {/*              <Button*/}
      {/*                style={{ marginLeft: 8 }}*/}
      {/*                variant="outlined"*/}
      {/*                type="submit"*/}
      {/*              >*/}
      {/*                Agregar Tarea*/}
      {/*              </Button>*/}
      {/*            </div>*/}
      {/*          </div>*/}
      {/*        </form>*/}
      {/*      </div>*/}
      {/*    ) : (*/}
      {/*      <Button onClick={e => props.showEditDiv(state.DataProcesos[0].id, e)} >*/}
      {/*        <AddIcon />Agregar tarea*/}
      {/*      </Button>*/}
      {/*    )*/}
      {/*  }*/}
      {/*</div>*/}
      <div style={{ marginTop: "10px" }}>
        <Button onClick={()=>{props.funcion(); props.funcion2()}} variant="contained" color="primary">
          Crear Orden de Produccion
        </Button>
      </div>
    </div>
  );
}

export default ProcesoDetalle;
