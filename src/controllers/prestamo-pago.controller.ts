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
  Prestamo,
  Pago,
} from '../models';
import {PrestamoRepository} from '../repositories';

export class PrestamoPagoController {
  constructor(
    @repository(PrestamoRepository) protected prestamoRepository: PrestamoRepository,
  ) { }

  @get('/prestamos/{id}/pagos', {
    responses: {
      '200': {
        description: 'Array of Prestamo has many Pago',
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
    return this.prestamoRepository.pago(id).find(filter);
  }

  @post('/prestamos/{id}/pagos', {
    responses: {
      '200': {
        description: 'Prestamo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pago)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Prestamo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pago, {
            title: 'NewPagoInPrestamo',
            exclude: ['id'],
            optional: ['prestamoId']
          }),
        },
      },
    }) pago: Omit<Pago, 'id'>,
  ): Promise<Pago> {
    return this.prestamoRepository.pago(id).create(pago);
  }

  @patch('/prestamos/{id}/pagos', {
    responses: {
      '200': {
        description: 'Prestamo.Pago PATCH success count',
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
    return this.prestamoRepository.pago(id).patch(pago, where);
  }

  @del('/prestamos/{id}/pagos', {
    responses: {
      '200': {
        description: 'Prestamo.Pago DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Pago)) where?: Where<Pago>,
  ): Promise<Count> {
    return this.prestamoRepository.pago(id).delete(where);
  }
}
