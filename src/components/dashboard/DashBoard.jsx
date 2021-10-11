import React from "react";
import { Grid } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
// styles
import useStyles from "../sytles";
import {
    ResponsiveContainer,
    YAxis,
    XAxis,
    BarChart,
    Bar,
    CartesianGrid,
    Tooltip,
    Legend,
  } from "recharts";

import Widget from "../widget/Widget"
import AssignmentIcon from '@material-ui/icons/Assignment';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { red, yellow } from '@material-ui/core/colors';
import SearchBar from "material-ui-search-bar";

import Tarjeta from './Tarjeta.jsx'
import TarjetaEstado from './TarjetaEstado.jsx'
import TarjetaOrden from "./TarjetaOrden";

//JSON DE EJEMPLO, DESPUES SE CAMBIA
const data = [
  {
    name: 'Usuario 1',
    completadas: 10,
    pendientes: 5,
    sinEmpezar: 3,
  },
  {
    name: 'Usuario 2',
    completadas: 20,
    pendientes: 10,
    sinEmpezar: 4,
  },

];

const DashBoard = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div>
      <Grid container spacing={3}>
        <Tarjeta titulo = "Total de ordenes" icon = { <AssignmentIcon /> } color = { red } cantidad = { props.cantOrdenes } />
        <TarjetaEstado titulo = "Total de ordenes" datos = { props.ordenesPorEstado } />
        <Tarjeta titulo = "Total de tareas" icon = { <ListAltIcon /> } color = { yellow } cantidad = { props.cantTareas } />
        <TarjetaEstado titulo = "Total de tareas" datos = { props.tareasPorEstado } />
      </Grid>

      <Grid container spacing={4}>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <Widget title="Control de ordenes" upperTitle className={classes.card}>
            <SearchBar
                placeholder="buscar orden..."
                //value={searched}
                //onChange={(searchVal) => requestSearch(searchVal)}
                //onCancelSearch={() => cancelSearch()}
            />
            {
              props.analisisOrdenes.map((row) => (
                <TarjetaOrden orden = {row} />
              ))
            }
          </Widget>
        </Grid>

        <Grid item lg={6} md={6} sm={6} xs={12}>
        <Widget title="Control de tareas" upperTitle className={classes.card}>
          <Grid container spacing={2}>
            <Grid  item lg={12} item xs={6}>
            <ResponsiveContainer width="100%" height={600}>
              <BarChart
                layout="vertical"
                width="100%"
                height="60%"
                data={data}
                margin={{ left: theme.spacing(2) }}
              >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category"/>
              <Tooltip />
              <Legend />
              <Bar dataKey="completadas" fill="#00b33c" />
              <Bar dataKey="pendientes" fill="#e60000" />
              <Bar name="sin empezar" dataKey="sinEmpezar" fill="#ffcc00" />
              </BarChart>
          </ResponsiveContainer>
            </Grid>

          </Grid>
        </Widget>
      </Grid>
      </Grid>

      <Grid container spacing={2}>


      </Grid>
  </div>
  )
}

export default DashBoard
