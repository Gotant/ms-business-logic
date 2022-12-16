import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Usuario,
  Prestamo,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioPrestamoController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/prestamos', {
    responses: {
      '200': {
        description: 'Array of Usuario has many Prestamo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Prestamo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Prestamo>,
  ): Promise<Prestamo[]> {
    return this.usuarioRepository.prestamos(id).find(filter);
  }

  @post('/usuarios/{id}/prestamos', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Prestamo)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Usuario.prototype.cedula,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Prestamo, {
            title: 'NewPrestamoInUsuario',
            exclude: ['id'],
            optional: ['cedulaUsuario']
          }),
        },
      },
    }) prestamo: Omit<Prestamo, 'id'>,
  ): Promise<Prestamo> {
    return this.usuarioRepository.prestamos(id).create(prestamo);
  }

  @patch('/usuarios/{id}/prestamos', {
    responses: {
      '200': {
        description: 'Usuario.Prestamo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Prestamo, {partial: true}),
        },
      },
    })
    prestamo: Partial<Prestamo>,
    @param.query.object('where', getWhereSchemaFor(Prestamo)) where?: Where<Prestamo>,
  ): Promise<Count> {
    return this.usuarioRepository.prestamos(id).patch(prestamo, where);
  }

  @del('/usuarios/{id}/prestamos', {
    responses: {
      '200': {
        description: 'Usuario.Prestamo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Prestamo)) where?: Where<Prestamo>,
  ): Promise<Count> {
    return this.usuarioRepository.prestamos(id).delete(where);
  }
}
