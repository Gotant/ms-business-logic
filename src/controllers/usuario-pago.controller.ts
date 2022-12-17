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
  Pago,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioPagoController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/pagos', {
    responses: {
      '200': {
        description: 'Array of Usuario has many Pago',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pago)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Pago>,
  ): Promise<Pago[]> {
    return this.usuarioRepository.pagos(id).find(filter);
  }

  @post('/usuarios/{id}/pagos', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pago)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Usuario.prototype.cedula,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pago, {
            title: 'NewPagoInUsuario',
            exclude: ['id'],
            optional: ['usuarioId']
          }),
        },
      },
    }) pago: Omit<Pago, 'id'>,
  ): Promise<Pago> {
    return this.usuarioRepository.pagos(id).create(pago);
  }

  @patch('/usuarios/{id}/pagos', {
    responses: {
      '200': {
        description: 'Usuario.Pago PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pago, {partial: true}),
        },
      },
    })
    pago: Partial<Pago>,
    @param.query.object('where', getWhereSchemaFor(Pago)) where?: Where<Pago>,
  ): Promise<Count> {
    return this.usuarioRepository.pagos(id).patch(pago, where);
  }

  @del('/usuarios/{id}/pagos', {
    responses: {
      '200': {
        description: 'Usuario.Pago DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Pago)) where?: Where<Pago>,
  ): Promise<Count> {
    return this.usuarioRepository.pagos(id).delete(where);
  }
}
