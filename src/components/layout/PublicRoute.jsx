import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PublicRoute = ({component: Component, restricted, ...rest}) => {
  const isLogin = rest.logginIn;

  return (
      <Route {...rest} render = { props => (
          isLogin && restricted
            ? <Redirect to = "/" />
            : <Component { ...props } />
      )} />
  );
};

const mapStateToProps = (state) => {
  const { logginIn } = state.usuariosReducer;
  return { logginIn };
}

export default connect(mapStateToProps)(PublicRoute);
