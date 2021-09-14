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



const ordenesData = [
    { name: "Terminadas", value: 10, color: "success" },
    { name: "Pendientes", value: 6, color: "error" },
    { name: "Sin empezar", value: 2, color: "warning" },
  ];

const tareasData = [
    { name: "Terminadas", value: 20, color: "success" },
    { name: "Pendientes", value: 10, color: "error" },
    { name: "Sin empezar", value: 20, color: "warning" },
  ];
  


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

const DashBoard =(props) =>{
    var classes = useStyles();
    var theme = useTheme();
    

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
    </div>
    
    )
}

export default DashBoard