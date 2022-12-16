import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_prestamo_caja_caja_id: {
        name: 'fk_prestamo_caja_caja_id',
        entity: 'Caja',
        entityKey: 'id',
        foreignKey: 'cajaId',
      },
      fk_prestamo_caja_prestamo_id: {
        name: 'fk_prestamo_caja_prestamo_id',
        entity: 'Prestamo',
        entityKey: 'id',
        foreignKey: 'prestamoId',
      },
    },
  },
})
export class PrestamoCaja extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  cajaId?: number;

  @property({
    type: 'number',
  })
  prestamoId?: number;

  constructor(data?: Partial<PrestamoCaja>) {
    super(data);
  }
}

export interface PrestamoCajaRelations {
  // describe navigational properties here
}

export type PrestamoCajaWithRelations = PrestamoCaja & PrestamoCajaRelations;
