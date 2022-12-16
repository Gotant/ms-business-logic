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
Caja,
PrestamoCaja,
Prestamo,
} from '../models';
import {CajaRepository} from '../repositories';

export class CajaPrestamoController {
  constructor(
    @repository(CajaRepository) protected cajaRepository: CajaRepository,
  ) { }

  @get('/cajas/{id}/prestamos', {
    responses: {
      '200': {
        description: 'Array of Caja has many Prestamo through PrestamoCaja',
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
    return this.cajaRepository.prestamo(id).find(filter);
  }

  @post('/cajas/{id}/prestamos', {
    responses: {
      '200': {
        description: 'create a Prestamo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Prestamo)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Caja.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Prestamo, {
            title: 'NewPrestamoInCaja',
            exclude: ['id'],
          }),
        },
      },
    }) prestamo: Omit<Prestamo, 'id'>,
  ): Promise<Prestamo> {
    return this.cajaRepository.prestamo(id).create(prestamo);
  }

  @patch('/cajas/{id}/prestamos', {
    responses: {
      '200': {
        description: 'Caja.Prestamo PATCH success count',
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
    return this.cajaRepository.prestamo(id).patch(prestamo, where);
  }

  @del('/cajas/{id}/prestamos', {
    responses: {
      '200': {
        description: 'Caja.Prestamo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Prestamo)) where?: Where<Prestamo>,
  ): Promise<Count> {
    return this.cajaRepository.prestamo(id).delete(where);
  }
}
