import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_transaccion_cobrador_caja_id: {
        name: 'fk_transaccion_cobrador_caja_id',
        entity: 'Caja',
        entityKey: 'id',
        foreignKey: 'cajaId',
      },
      fk_transaccion_cobrador_cobrador_cedula: {
        name: 'fk_transaccion_cobrador_cobrador_cedula',
        entity: 'Cobrador',
        entityKey: 'cedula',
        foreignKey: 'cobradoCedula',
      },
    },
  },
})
export class TransaccionCobrador extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'number',
  })
  cajaId?: number;

  @property({
    type: 'number',
  })
  cobradoCedula?: number;

  constructor(data?: Partial<TransaccionCobrador>) {
    super(data);
  }
}

export interface TransaccionCobradorRelations {
  // describe navigational properties here
}

export type TransaccionCobradorWithRelations = TransaccionCobrador &
  TransaccionCobradorRelations;
