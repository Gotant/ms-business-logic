import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_transaccion_inversionista_caja_id: {
        name: 'fk_transaccion_inversionista_caja_id',
        entity: 'Caja',
        entityKey: 'id',
        foreignKey: 'cajaId',
      },
      fk_transaccion_inversionista_inversionista_cedula: {
        name: 'fk_transaccion_inversionista_inversionista_cedula',
        entity: 'Inversionista',
        entityKey: 'cedula',
        foreignKey: 'inversionistaCedula',
      },
    },
  },
})
export class TransaccionInversionista extends Entity {
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
    type: 'number',
    required: true,
  })
  interes: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'number',
  })
  cajaId?: number;

  @property({
    type: 'number',
  })
  inversionistaCedula?: number;

  constructor(data?: Partial<TransaccionInversionista>) {
    super(data);
  }
}

export interface TransaccionInversionistaRelations {
  // describe navigational properties here
}

export type TransaccionInversionistaWithRelations = TransaccionInversionista &
  TransaccionInversionistaRelations;
