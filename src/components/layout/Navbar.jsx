import React, { Fragment } from "react";
import { connect } from "react-redux";

import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import MenuIcon from '@material-ui/icons/Menu';
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import NightsStayIcon from '@material-ui/icons/NightsStay';

import { toggleDarkMode } from "../../store/actions";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(1)
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  }
}));

const Navbar = (props) => {
  const classes = useStyles();

  return (
    <Fragment>
      <AppBar className = { classes.appBar } >
        <Toolbar>
          <IconButton
            color = "inherit"
            aria-label = "menu-icon"
            edge = "start"
            className = { classes.menuButton }
            onClick = { props.handleShow }
          >
            <MenuIcon />
          </IconButton>
          <Typography variant = "h6" className = { classes.title } >
            Daprolac
          </Typography>
          <IconButton
            color = "inherit"
            aria-label = "switch-mode"
            edge = "start"
            onClick = { props.toggleDarkMode }
          >
            { props.darkMode ? <NightsStayIcon /> : <Brightness5Icon /> }
          </IconButton>
          <AccountBoxRoundedIcon fontSize = "large" />
        </Toolbar>
      </AppBar>
    </Fragment>
  )
}

const mapStateToProps = (reducers) => ({ darkMode: reducers.globalReducer.darkMode });
const mapDispatchToProps = { toggleDarkMode }

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
