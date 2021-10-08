import React, { useState } from "react";
import {
  Grid,
  Box,
  Card,
  CardContent,
} from "@material-ui/core";
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
import { Typography } from "./Wrappers";
import AssignmentIcon from '@material-ui/icons/Assignment';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { red,green,yellow,purple } from '@material-ui/core/colors';
import SearchBar from "material-ui-search-bar";
import LinearProgress from '@material-ui/core/LinearProgress';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import Tarjeta from './Tarjeta.jsx'
import TarjetaEstado from './TarjetaEstado.jsx'

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

//JSON DE EJEMPLO, DESPUES SE CAMBIA
const originalRows = [
  { nombre: "orden 1", tareas: 10, porcentaje: 13, fecha_estimada: "24-2-1", estado:"pendiente", color:"#e60000"},
  { nombre: "orden 2", tareas: 200, porcentaje: 100, fecha_estimada: 24, estado:"completado" , color:"#00b33c"},
  { nombre: "orden 3", tareas: 200, porcentaje: 50, fecha_estimada: 24, estado:"pendiente" , color:"#e60000"},
  { nombre: "orden 4", tareas: 200, porcentaje: 6.0, fecha_estimada: 24, estado:"pendiente", color:"#e60000"},
  { nombre: "orden 5", tareas: 200, porcentaje: 6.0, fecha_estimada: 24, estado:"pendiente", color:"#e60000"},
  { nombre: "orden 6", tareas: 200, porcentaje: 0, fecha_estimada: 24, estado:"sin empezar", color:"#ffcc00"}
];


function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{
          props.value} %
        </Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

const DashBoard = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [rows, setRows] = useState(originalRows);

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
              {rows.map((row) => (
                  <Card style={{marginTop:10,marginBottom:10}}>
                    <CardContent>
                      <Grid
                          container
                          spacing={2}
                          sx={{ justifyContent: 'space-between' }}
                      >
                        <Grid item lg={10} item md={8} item xs={6}>
                          <Typography variant="h6"> {row.nombre}</Typography>
                        </Grid>

                        <Grid item lg={2} item md={4} item xs={4}>
                          {/* <Typography style={{color:row.color}}> {row.estado}</Typography> */}
                          <Chip style={{color:"white",backgroundColor:row.color}} label={row.estado} />
                        </Grid>

                      </Grid>
                      <LinearProgressWithLabel value={row.porcentaje} />
                      <Grid
                          container
                          //style={{marginTop:-20}}
                          spacing={10}
                          sx={{ justifyContent: 'space-between' }}>
                        <Grid item lg={4}>
                          <Typography variant="h6">% {row.porcentaje}</Typography>
                        </Grid>
                        <Grid item lg={4}>
                          <Typography variant="h6">{row.tareas}</Typography>
                        </Grid>
                        <Grid item lg={4}>
                          <Typography variant="h6">{row.fecha_estimada}</Typography>
                        </Grid>
                      </Grid>
                      <Grid
                          container
                      >
                        <Grid item lg={4} item xs={4}>
                          <Typography color="textSecondary"  variant="h6">completado</Typography>
                        </Grid>
                        <Grid item lg={4} item xs={4}>
                          <Typography color="textSecondary" style={{marginLeft:20}} variant="h6">tareas</Typography>
                        </Grid>
                        <Grid item lg={4} item xs={4}>
                          <Typography variant="h6">fecha estimada</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
              ))}


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
