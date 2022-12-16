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
  Garantia,
  Prestamo,
} from '../models';
import {GarantiaRepository} from '../repositories';

export class GarantiaPrestamoController {
  constructor(
    @repository(GarantiaRepository) protected garantiaRepository: GarantiaRepository,
  ) { }

  @get('/garantias/{id}/prestamo', {
    responses: {
      '200': {
        description: 'Garantia has one Prestamo',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Prestamo),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Prestamo>,
  ): Promise<Prestamo> {
    return this.garantiaRepository.prestamo(id).get(filter);
  }

  @post('/garantias/{id}/prestamo', {
    responses: {
      '200': {
        description: 'Garantia model instance',
        content: {'application/json': {schema: getModelSchemaRef(Prestamo)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Garantia.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Prestamo, {
            title: 'NewPrestamoInGarantia',
            exclude: ['id'],
            optional: ['garantiaId']
          }),
        },
      },
    }) prestamo: Omit<Prestamo, 'id'>,
  ): Promise<Prestamo> {
    return this.garantiaRepository.prestamo(id).create(prestamo);
  }

  @patch('/garantias/{id}/prestamo', {
    responses: {
      '200': {
        description: 'Garantia.Prestamo PATCH success count',
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
    return this.garantiaRepository.prestamo(id).patch(prestamo, where);
  }

  @del('/garantias/{id}/prestamo', {
    responses: {
      '200': {
        description: 'Garantia.Prestamo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Prestamo)) where?: Where<Prestamo>,
  ): Promise<Count> {
    return this.garantiaRepository.prestamo(id).delete(where);
  }
}
