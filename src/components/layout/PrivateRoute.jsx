import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLogin = rest.logginIn;

  return (
      <Route { ...rest } render = { props => (
          isLogin
            ? <Component {...props} />
            : <Redirect to="/login" />
            )}
      />
  );
};

const mapStateToProps = (state) => {
  const { logginIn } = state.usuariosReducer;
  return { logginIn };
}

export default connect(mapStateToProps)(PrivateRoute);
