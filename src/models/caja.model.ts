import {Entity, hasMany, model, property} from '@loopback/repository';
import {Cobrador} from './cobrador.model';
import {Inversionista} from './inversionista.model';
import {PrestamoCaja} from './prestamo-caja.model';
import {Prestamo} from './prestamo.model';
import {TransaccionCobrador} from './transaccion-cobrador.model';
import {TransaccionInversionista} from './transaccion-inversionista.model';

@model()
export class Caja extends Entity {
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
  fondos: number;

  @property({
    type: 'number',
    required: true,
  })
  dineroCirculado: number;

  @property({
    type: 'string',
  })
  codigoQR?: string;

  @property({
    type: 'string',
    required: true,
  })
  modalidad: string;

  @property({
    type: 'string',
    required: true,
  })
  moneda: string;

  @property({
    type: 'string',
  })
  ciudad?: string;

  @hasMany(() => Inversionista, {
    through: {
      model: () => TransaccionInversionista,
      keyTo: 'inversionistaCedula',
    },
  })
  inversionista: Inversionista[];

  @hasMany(() => Prestamo, {through: {model: () => PrestamoCaja}})
  prestamo: Prestamo[];

  @hasMany(() => Cobrador, {
    through: {model: () => TransaccionCobrador, keyTo: 'cobradoCedula'},
  })
  cobrador: Cobrador[];

  constructor(data?: Partial<Caja>) {
    super(data);
  }
}

export interface CajaRelations {
  // describe navigational properties here
}

export type CajaWithRelations = Caja & CajaRelations;
