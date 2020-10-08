import React from "react";
import { Link } from "react-router-dom";

import { GridListTile, GridListTileBar, IconButton } from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";

const OrdenesList = ({ orden, borrar, ...props }) => {
  return (
    <GridListTile {...props}>
      <Link to={`/ordenes/${orden.id}`}>
        <GridListTileBar
          title={"Orden : " + orden.numero}
          titlePosition="top"
        />
      </Link>
      <div style={{ textAlign: "right" }}>
        <IconButton
          aria-label={`info about ${orden.numero}`}
          onClick={() => borrar(orden.id)}
        >
          <DeleteIcon size="big" />
        </IconButton>
      </div>
    </GridListTile>
  );
};

export default OrdenesList;
