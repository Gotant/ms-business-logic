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
TransaccionCobrador,
Cobrador,
} from '../models';
import {CajaRepository} from '../repositories';

export class CajaCobradorController {
  constructor(
    @repository(CajaRepository) protected cajaRepository: CajaRepository,
  ) { }

  @get('/cajas/{id}/cobradors', {
    responses: {
      '200': {
        description: 'Array of Caja has many Cobrador through TransaccionCobrador',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cobrador)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Cobrador>,
  ): Promise<Cobrador[]> {
    return this.cajaRepository.cobrador(id).find(filter);
  }

  @post('/cajas/{id}/cobradors', {
    responses: {
      '200': {
        description: 'create a Cobrador model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cobrador)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Caja.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cobrador, {
            title: 'NewCobradorInCaja',
            exclude: ['cedula'],
          }),
        },
      },
    }) cobrador: Omit<Cobrador, 'cedula'>,
  ): Promise<Cobrador> {
    return this.cajaRepository.cobrador(id).create(cobrador);
  }

  @patch('/cajas/{id}/cobradors', {
    responses: {
      '200': {
        description: 'Caja.Cobrador PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cobrador, {partial: true}),
        },
      },
    })
    cobrador: Partial<Cobrador>,
    @param.query.object('where', getWhereSchemaFor(Cobrador)) where?: Where<Cobrador>,
  ): Promise<Count> {
    return this.cajaRepository.cobrador(id).patch(cobrador, where);
  }

  @del('/cajas/{id}/cobradors', {
    responses: {
      '200': {
        description: 'Caja.Cobrador DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Cobrador)) where?: Where<Cobrador>,
  ): Promise<Count> {
    return this.cajaRepository.cobrador(id).delete(where);
  }
}
