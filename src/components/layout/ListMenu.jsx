import React, { Fragment } from "react";

import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import ListAltIcon from '@material-ui/icons/ListAlt';
import CodeIcon from '@material-ui/icons/Code';

export const items = [
  { id: 1, label: "Procesos", link: "/procesos", icon: DynamicFeedIcon },
  { id: 2, label: "Tareas", link: "/tareas", icon: ListAltIcon },
  { id: 3, label: "Datos", link: "/datos", icon: CodeIcon }
];

const ListMenu = () => {
  return (
    <Fragment >
      <List component="nav">
        { items.map(item => (
            <ListItem key={item.id} button >
              <ListItemIcon>
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
        )) }
      </List>
    </Fragment>
  )
}

export default ListMenu;
