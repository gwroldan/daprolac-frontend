import React from 'react';
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@material-ui/core';

import LoginContainer from './LoginContainer';
import RegistroContainer from './RegistroContainer';
import Layout from '../components/layout/Layout';
import PrivateRoute from '../components/layout/PrivateRoute';
import PublicRoute from '../components/layout/PublicRoute';
import Usuarios from '../components/Usuarios';

import { customTheme, customDarkTheme } from '../styles/themeConfig';

const App = (props) => (
  <ThemeProvider theme = { props.darkMode ? customDarkTheme : customTheme }>
    <CssBaseline />
    <BrowserRouter>
      <Switch>
        <PublicRoute exact path = "/login" restricted = {true} component = { LoginContainer } />
        <PrivateRoute exact path = "/" component = { () => (<Layout><Usuarios /></Layout>) } />
        <Route exact path = "/registro" component = { RegistroContainer } />
      </Switch>
    </BrowserRouter>
  </ThemeProvider>
);

const mapStateToProps = (reducers) => ({ darkMode: reducers.globalReducer.darkMode })

export default connect(mapStateToProps)(App);
