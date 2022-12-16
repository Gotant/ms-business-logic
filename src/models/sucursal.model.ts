import {Entity, hasMany, model, property} from '@loopback/repository';
import {Pago} from './pago.model';

@model()
export class Sucursal extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  barrio: string;

  @property({
    type: 'string',
    required: true,
  })
  foto: string;

  @hasMany(() => Pago)
  pago: Pago[];

  constructor(data?: Partial<Sucursal>) {
    super(data);
  }
}

export interface SucursalRelations {
  // describe navigational properties here
}

export type SucursalWithRelations = Sucursal & SucursalRelations;
