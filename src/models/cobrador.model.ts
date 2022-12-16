import {Entity, hasMany, model, property} from '@loopback/repository';
import {Pago} from './pago.model';

@model({
  settings: {
    foreignKeys: {
      fk_cobrador_vehiculo_placa: {
        name: 'fk_cobrador_vehiculo_placa',
        entity: 'Vehiculo',
        entityKey: 'placa',
        foreignKey: 'vehiculoPlaca',
      },
    },
  },
})
export class Cobrador extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  cedula: number;

  @property({
    type: 'string',
    required: true,
  })
  primerNombre: string;

  @property({
    type: 'string',
    required: true,
  })
  primerApellido: string;

  @property({
    type: 'string',
  })
  segundoNombre?: string;

  @property({
    type: 'string',
  })
  segundoApellido?: string;

  @property({
    type: 'number',
    required: true,
  })
  telefono: number;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaNacimiento: string;

  @property({
    type: 'string',
    required: true,
  })
  foto: string;

  @property({
    type: 'boolean',
    required: true,
  })
  activo: boolean;

  @property({
    type: 'string',
    required: true,
  })
  pais: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  departamento: string;

  @property({
    type: 'string',
    required: true,
  })
  barrio: string;

  @property({
    type: 'string',
  })
  vehiculoPlaca?: string;

  @hasMany(() => Pago, {keyTo: 'cobradorCedula'})
  pago: Pago[];

  constructor(data?: Partial<Cobrador>) {
    super(data);
  }
}

export interface CobradorRelations {
  // describe navigational properties here
}

export type CobradorWithRelations = Cobrador & CobradorRelations;
