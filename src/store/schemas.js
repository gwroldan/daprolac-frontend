import { schema } from "normalizr";

export const usuarioEntity = new schema.Entity("usuarios");
export const tareaDatoEntity = new schema.Entity("tareasDatos",{},{
  idAttribute: value => `${value.idTarea}-${value.idDato}`
} );
export const datoEntity = new schema.Entity("datos", {
  tarea_dato: tareaDatoEntity
});
export const procesoTareaEntity = new schema.Entity("procesosTareas",{},{
  idAttribute: value => `${value.idProceso}-${value.idTarea}`
} );
export const tareaEntity = new schema.Entity("tareas", {
  datos: [datoEntity],
  proceso_tarea: procesoTareaEntity
});
export const procesoEntity = new schema.Entity("procesos", {
  tareas: [tareaEntity]
});

