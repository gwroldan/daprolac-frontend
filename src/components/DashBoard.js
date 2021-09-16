import React, { useState } from "react";
import {
  Grid,
  Avatar,
  Box,
  Card,
  CardContent,
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
// styles
import useStyles from "./sytles";
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    YAxis,
    XAxis,
    BarChart,
    Bar,
    CartesianGrid,
    Tooltip, 
    Legend,
  } from "recharts";

import Widget from "../components/widget/Widget"
import { Typography } from "../components/wrappers/Wrappers";
import Dot from "../components/dot/Dot"
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MoneyIcon from '@material-ui/icons/Money';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { red,green,yellow,purple } from '@material-ui/core/colors';
import SearchBar from "material-ui-search-bar";
import LinearProgress from '@material-ui/core/LinearProgress';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';


//JSON DE EJEMPLO, DESPUES SE CAMBIA
const ordenesData = [
    { name: "Terminadas", value: 10, color: "success" },
    { name: "Pendientes", value: 6, color: "error" },
    { name: "Sin empezar", value: 2, color: "warning" },
  ];

  //JSON DE EJEMPLO, DESPUES SE CAMBIA
const tareasData = [
    { name: "Terminadas", value: 20, color: "success" },
    { name: "Pendientes", value: 10, color: "error" },
    { name: "Sin empezar", value: 20, color: "warning" },
  ];
  

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

const DashBoard =(props) =>{
    var classes = useStyles();
    var theme = useTheme();
    const [rows, setRows] = useState(originalRows);


    
    
  

    return (
    <div>
        <Grid container spacing={3}>
        <Grid item lg={3} md={4} sm={6} xs={12}>
                <Card
            sx={{ height: '100%' }}
            {...props}
            >
            <CardContent>
            <Grid
                container
                spacing={3}
                sx={{ justifyContent: 'space-between' }}
            >
                <Grid item>
                <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="h6"
                >
                    Total de ordenes
                </Typography>
                <Typography
                    color="textPrimary"
                    variant="h3"
                >
                    18
                </Typography>
                </Grid>
                <Grid item>
                <Avatar
                    style={{
                    backgroundColor: red[600],
                    height: 56,
                    width: 56
                    }}
                >
                    <AssignmentIcon />
                </Avatar>
                </Grid>
            </Grid>
            <Box
                sx={{
                pt: 2,
                display: 'flex',
                alignItems: 'center'
                }}
            >
                <ArrowDownwardIcon sx={{ color: red[900] }} />
                <Typography
                sx={{
                    color: red[900],
                    mr: 1
                }}
                variant="body2"
                >
                12%
                </Typography>
                <Typography
                color="textSecondary"
                variant="caption"
                >
                Since last month
                </Typography>
            </Box>
            </CardContent>
        </Card>
        </Grid>

        <Grid item lg={3} md={4} sm={6} xs={12}>
                <Card
            sx={{ height: '100%' }}
            {...props}
            >
            <CardContent>
            <Grid
                container
                spacing={3}
                sx={{ justifyContent: 'space-between' }}
            >
                <Grid item>
                <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="h6"
                >
                    Total de tareas
                </Typography>
                <Typography
                    color="textPrimary"
                    variant="h3"
                >
                    40
                </Typography>
                </Grid>
                <Grid item>
                <Avatar
                    style={{
                    backgroundColor: yellow[600],
                    height: 56,
                    width: 56
                    }}
                >
                    <ListAltIcon />
                </Avatar>
                </Grid>
            </Grid>
            <Box
                sx={{
                pt: 2,
                display: 'flex',
                alignItems: 'center'
                }}
            >
                <ArrowDownwardIcon sx={{ color: red[900] }} />
                <Typography
                sx={{
                    color: red[900],
                    mr: 1
                }}
                variant="body2"
                >
                12%
                </Typography>
                <Typography
                color="textSecondary"
                variant="caption"
                >
                Since last month
                </Typography>
            </Box>
            </CardContent>
        </Card>
        </Grid>

        <Grid item lg={3} md={4} sm={6} xs={12}>
                <Card
            sx={{ height: '100%' }}
            {...props}
            >
            <CardContent>
            <Grid
                container
                spacing={3}
                sx={{ justifyContent: 'space-between' }}
            >
                <Grid item>
                <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="h6"
                >
                    Total de datos
                </Typography>
                <Typography
                    color="textPrimary"
                    variant="h3"
                >
                    100
                </Typography>
                </Grid>
                <Grid item>
                <Avatar
                    style={{
                    backgroundColor: purple[600],
                    height: 56,
                    width: 56
                    }}
                >
                    <AssignmentTurnedInIcon />
                </Avatar>
                </Grid>
            </Grid>
            <Box
                sx={{
                pt: 2,
                display: 'flex',
                alignItems: 'center'
                }}
            >
                <ArrowDownwardIcon sx={{ color: red[900] }} />
                <Typography
                sx={{
                    color: red[900],
                    mr: 1
                }}
                variant="body2"
                >
                12%
                </Typography>
                <Typography
                color="textSecondary"
                variant="caption"
                >
                Since last month
                </Typography>
            </Box>
            </CardContent>
        </Card>
        </Grid>

        <Grid item lg={3} md={4} sm={6} xs={12}>
                <Card
            sx={{ height: '100%' }}
            {...props}
            >
            <CardContent>
            <Grid
                container
                spacing={3}
                sx={{ justifyContent: 'space-between' }}
            >
                <Grid item>
                <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="h6"
                >
                    Total de usuarios
                </Typography>
                <Typography
                    color="textPrimary"
                    variant="h3"
                >
                    10
                </Typography>
                </Grid>
                <Grid item>
                <Avatar
                    style={{
                        backgroundColor: green[600],
                        height: 56,
                        width: 56
                        }}
                >
                    <PeopleIcon/>
                </Avatar>
                </Grid>
            </Grid>
            <Box
                sx={{
                pt: 2,
                display: 'flex',
                alignItems: 'center'
                }}
            >
                <ArrowDownwardIcon sx={{ color: red[900] }} />
                <Typography
                sx={{
                    color: red[900],
                    mr: 1
                }}
                variant="body2"
                >
                12%
                </Typography>
                <Typography
                color="textSecondary"
                variant="caption"
                >
                Since last month
                </Typography>
            </Box>
            </CardContent>
        </Card>
        </Grid>

        </Grid>

        <Grid container spacing={4}>
         <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget title="Todas las ordenes" upperTitle className={classes.card}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <ResponsiveContainer width="100%" height={144}>
                  <PieChart margin={{ left: theme.spacing(2) }}>
                    <Pie
                      data={ordenesData}
                      innerRadius={45}
                      outerRadius={60}
                      dataKey="value"
                    >
                      {ordenesData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={theme.palette[entry.color].main}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.pieChartLegendWrapper}>
                  {ordenesData.map(({ name, value, color }, index) => (
                    <div key={color} className={classes.legendItemContainer}>
                      <Dot color={color} />
                      <Typography style={{ whiteSpace: "nowrap" }}>
                        &nbsp;{name}&nbsp;
                      </Typography>
                      <Typography color="text" colorBrightness="secondary">
                        &nbsp;{value}
                      </Typography>
                    </div>
                  ))}
                </div>
              </Grid>
            </Grid>
          </Widget>
        </Grid>

        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget title="Todas las tareas" upperTitle className={classes.card}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <ResponsiveContainer width="100%" height={144}>
                  <PieChart margin={{ left: theme.spacing(2) }}>
                    <Pie
                      data={tareasData}
                      innerRadius={45}
                      outerRadius={60}
                      dataKey="value"
                    >
                      {tareasData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={theme.palette[entry.color].main}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.pieChartLegendWrapper}>
                  {tareasData.map(({ name, value, color }, index) => (
                    <div key={color} className={classes.legendItemContainer}>
                      <Dot color={color} />
                      <Typography style={{ whiteSpace: "nowrap" }}>
                        &nbsp;{name}&nbsp;
                      </Typography>
                      <Typography color="text" colorBrightness="secondary">
                        &nbsp;{value}
                      </Typography>
                    </div>
                  ))}
                </div>
              </Grid>
            </Grid>
          </Widget>
        </Grid>

        
        </Grid>


        <Grid container spacing={4}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Widget title="Control de tareas" upperTitle className={classes.card}>
            <Grid container spacing={2}>
              <Grid  item lg={12} item xs={6}>
              <ResponsiveContainer width="100%" height={600}>
                <BarChart
                width="100%"
                height="60%"
                data={data}
                margin={{ left: theme.spacing(2) }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
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

        </Grid>
    </div>
    
    )
}

export default DashBoard