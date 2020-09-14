import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import ListAltIcon from '@material-ui/icons/ListAlt';
import CodeIcon from '@material-ui/icons/Code';

export const items = [
  { id: 1, label: "Procesos", link: "/procesos", icon: DynamicFeedIcon },
  { id: 2, label: "Tareas", link: "/tareas", icon: ListAltIcon },
  { id: 3, label: "Datos", link: "/datos", icon: CodeIcon }
];

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary
  }
}));

const ListMenu = () => {
  const classes = useStyles();

  return (
    <Fragment >
      <List component = "nav" >
        { items.map( item => (
            <Link to = "/procesos" key = { item.id } className = { classes.link } >
              <ListItem button >
                <ListItemIcon>
                  <item.icon />
                </ListItemIcon>
                <ListItemText primary = { item.label } />
              </ListItem>
            </Link>
        )) }
      </List>
    </Fragment>
  )
}

export default ListMenu;
