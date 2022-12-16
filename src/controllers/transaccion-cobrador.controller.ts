import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {TransaccionCobrador} from '../models';
import {TransaccionCobradorRepository} from '../repositories';

export class TransaccionCobradorController {
  constructor(
    @repository(TransaccionCobradorRepository)
    public transaccionCobradorRepository : TransaccionCobradorRepository,
  ) {}

  @post('/transaccion-cobrador')
  @response(200, {
    description: 'TransaccionCobrador model instance',
    content: {'application/json': {schema: getModelSchemaRef(TransaccionCobrador)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TransaccionCobrador, {
            title: 'NewTransaccionCobrador',
            exclude: ['id'],
          }),
        },
      },
    })
    transaccionCobrador: Omit<TransaccionCobrador, 'id'>,
  ): Promise<TransaccionCobrador> {
    return this.transaccionCobradorRepository.create(transaccionCobrador);
  }

  @get('/transaccion-cobrador/count')
  @response(200, {
    description: 'TransaccionCobrador model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TransaccionCobrador) where?: Where<TransaccionCobrador>,
  ): Promise<Count> {
    return this.transaccionCobradorRepository.count(where);
  }

  @get('/transaccion-cobrador')
  @response(200, {
    description: 'Array of TransaccionCobrador model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TransaccionCobrador, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TransaccionCobrador) filter?: Filter<TransaccionCobrador>,
  ): Promise<TransaccionCobrador[]> {
    return this.transaccionCobradorRepository.find(filter);
  }

  @patch('/transaccion-cobrador')
  @response(200, {
    description: 'TransaccionCobrador PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TransaccionCobrador, {partial: true}),
        },
      },
    })
    transaccionCobrador: TransaccionCobrador,
    @param.where(TransaccionCobrador) where?: Where<TransaccionCobrador>,
  ): Promise<Count> {
    return this.transaccionCobradorRepository.updateAll(transaccionCobrador, where);
  }

  @get('/transaccion-cobrador/{id}')
  @response(200, {
    description: 'TransaccionCobrador model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TransaccionCobrador, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TransaccionCobrador, {exclude: 'where'}) filter?: FilterExcludingWhere<TransaccionCobrador>
  ): Promise<TransaccionCobrador> {
    return this.transaccionCobradorRepository.findById(id, filter);
  }

  @patch('/transaccion-cobrador/{id}')
  @response(204, {
    description: 'TransaccionCobrador PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TransaccionCobrador, {partial: true}),
        },
      },
    })
    transaccionCobrador: TransaccionCobrador,
  ): Promise<void> {
    await this.transaccionCobradorRepository.updateById(id, transaccionCobrador);
  }

  @put('/transaccion-cobrador/{id}')
  @response(204, {
    description: 'TransaccionCobrador PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() transaccionCobrador: TransaccionCobrador,
  ): Promise<void> {
    await this.transaccionCobradorRepository.replaceById(id, transaccionCobrador);
  }

  @del('/transaccion-cobrador/{id}')
  @response(204, {
    description: 'TransaccionCobrador DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.transaccionCobradorRepository.deleteById(id);
  }
}
