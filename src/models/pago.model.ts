import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Cobrador} from './cobrador.model';
import {Prestamo} from './prestamo.model';
import {Sucursal} from './sucursal.model';

@model({
  settings: {
    foreignKeys: {
      fk_pago_sucursal_id: {
        name: 'fk_pago_sucursal_id',
        entity: 'Sucursal',
        entityKey: 'id',
        foreignKey: 'sucursalId',
      },
      fk_pago_prestamo_id: {
        name: 'fk_pago_prestamo_id',
        entity: 'Prestamo',
        entityKey: 'id',
        foreignKey: 'prestamoId',
      },
      fk_pago_cobrador_cedula: {
        name: 'fk_pago_cobrador_cedula',
        entity: 'Cobrador',
        entityKey: 'cedula',
        foreignKey: 'cobradorCedula',
      },
    },
  },
})
export class Pago extends Entity {
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
    type: 'string',
    required: true,
  })
  mora: string;

  @belongsTo(() => Sucursal)
  sucursalId: number;

  @belongsTo(() => Cobrador, {name: 'cobradorCedulas'})
  cobradorCedula: number;

  @belongsTo(() => Prestamo)
  prestamoId: number;

  constructor(data?: Partial<Pago>) {
    super(data);
  }
}

export interface PagoRelations {
  // describe navigational properties here
}

export type PagoWithRelations = Pago & PagoRelations;
