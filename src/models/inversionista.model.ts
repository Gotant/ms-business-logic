import {Entity, model, property} from '@loopback/repository';

@model()
export class Inversionista extends Entity {
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


  constructor(data?: Partial<Inversionista>) {
    super(data);
  }
}

export interface InversionistaRelations {
  // describe navigational properties here
}

export type InversionistaWithRelations = Inversionista & InversionistaRelations;
