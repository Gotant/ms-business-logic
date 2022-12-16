import {
  belongsTo,
  Entity,
  hasMany,
  model,
  property
} from '@loopback/repository';
import {Pago} from './pago.model';
import {Usuario} from './usuario.model';

@model({
  settings: {
    foreignKeys: {
      fk_prestamo_usuario_cedula: {
        name: 'fk_prestamo_usuario_cedula',
        entity: 'Usuario',
        entityKey: 'cedula',
        foreignKey: 'cedulaUsuario',
      },
      fk_prestamo_codeudor_cedula: {
        name: 'fk_prestamo_codeudor_cedula',
        entity: 'Codeudor',
        entityKey: 'cedula',
        foreignKey: 'cedulaCodeudor',
      },
      fk_prestamo_garantia_id: {
        name: 'fk_prestamo_garantia_id',
        entity: 'Garantia',
        entityKey: 'id',
        foreignKey: 'garantiaId',
      },
    },
  },
})
export class Prestamo extends Entity {
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
    type: 'date',
    required: true,
  })
  fechaInicial: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaFinal: string;

  @property({
    type: 'number',
    required: true,
  })
  tasaInteres: number;

  @property({
    type: 'boolean',
    required: true,
  })
  estadoPago: boolean;

  @property({
    type: 'number',
  })
  cedulaCodeudor?: number;

  @property({
    type: 'number',
  })
  garantiaId?: number;

  @belongsTo(() => Usuario, {name: 'cedulaUsuarios'})
  cedulaUsuario: number;

  @hasMany(() => Pago)
  pago: Pago[];

  constructor(data?: Partial<Prestamo>) {
    super(data);
  }
}

export interface PrestamoRelations {
  // describe navigational properties here
}

export type PrestamoWithRelations = Prestamo & PrestamoRelations;
