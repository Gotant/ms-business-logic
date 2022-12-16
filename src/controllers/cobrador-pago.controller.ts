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
  Cobrador,
  Pago,
} from '../models';
import {CobradorRepository} from '../repositories';

export class CobradorPagoController {
  constructor(
    @repository(CobradorRepository) protected cobradorRepository: CobradorRepository,
  ) { }

  @get('/cobradors/{id}/pagos', {
    responses: {
      '200': {
        description: 'Array of Cobrador has many Pago',
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
    return this.cobradorRepository.pago(id).find(filter);
  }

  @post('/cobradors/{id}/pagos', {
    responses: {
      '200': {
        description: 'Cobrador model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pago)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Cobrador.prototype.cedula,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pago, {
            title: 'NewPagoInCobrador',
            exclude: ['id'],
            optional: ['cobradorCedula']
          }),
        },
      },
    }) pago: Omit<Pago, 'id'>,
  ): Promise<Pago> {
    return this.cobradorRepository.pago(id).create(pago);
  }

  @patch('/cobradors/{id}/pagos', {
    responses: {
      '200': {
        description: 'Cobrador.Pago PATCH success count',
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
    return this.cobradorRepository.pago(id).patch(pago, where);
  }

  @del('/cobradors/{id}/pagos', {
    responses: {
      '200': {
        description: 'Cobrador.Pago DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Pago)) where?: Where<Pago>,
  ): Promise<Count> {
    return this.cobradorRepository.pago(id).delete(where);
  }
}
