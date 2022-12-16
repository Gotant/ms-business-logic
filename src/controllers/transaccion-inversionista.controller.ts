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
import {TransaccionInversionista} from '../models';
import {TransaccionInversionistaRepository} from '../repositories';

export class TransaccionInversionistaController {
  constructor(
    @repository(TransaccionInversionistaRepository)
    public transaccionInversionistaRepository : TransaccionInversionistaRepository,
  ) {}

  @post('/transaccion-inversionista')
  @response(200, {
    description: 'TransaccionInversionista model instance',
    content: {'application/json': {schema: getModelSchemaRef(TransaccionInversionista)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TransaccionInversionista, {
            title: 'NewTransaccionInversionista',
            exclude: ['id'],
          }),
        },
      },
    })
    transaccionInversionista: Omit<TransaccionInversionista, 'id'>,
  ): Promise<TransaccionInversionista> {
    return this.transaccionInversionistaRepository.create(transaccionInversionista);
  }

  @get('/transaccion-inversionista/count')
  @response(200, {
    description: 'TransaccionInversionista model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TransaccionInversionista) where?: Where<TransaccionInversionista>,
  ): Promise<Count> {
    return this.transaccionInversionistaRepository.count(where);
  }

  @get('/transaccion-inversionista')
  @response(200, {
    description: 'Array of TransaccionInversionista model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TransaccionInversionista, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TransaccionInversionista) filter?: Filter<TransaccionInversionista>,
  ): Promise<TransaccionInversionista[]> {
    return this.transaccionInversionistaRepository.find(filter);
  }

  @patch('/transaccion-inversionista')
  @response(200, {
    description: 'TransaccionInversionista PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TransaccionInversionista, {partial: true}),
        },
      },
    })
    transaccionInversionista: TransaccionInversionista,
    @param.where(TransaccionInversionista) where?: Where<TransaccionInversionista>,
  ): Promise<Count> {
    return this.transaccionInversionistaRepository.updateAll(transaccionInversionista, where);
  }

  @get('/transaccion-inversionista/{id}')
  @response(200, {
    description: 'TransaccionInversionista model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TransaccionInversionista, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TransaccionInversionista, {exclude: 'where'}) filter?: FilterExcludingWhere<TransaccionInversionista>
  ): Promise<TransaccionInversionista> {
    return this.transaccionInversionistaRepository.findById(id, filter);
  }

  @patch('/transaccion-inversionista/{id}')
  @response(204, {
    description: 'TransaccionInversionista PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TransaccionInversionista, {partial: true}),
        },
      },
    })
    transaccionInversionista: TransaccionInversionista,
  ): Promise<void> {
    await this.transaccionInversionistaRepository.updateById(id, transaccionInversionista);
  }

  @put('/transaccion-inversionista/{id}')
  @response(204, {
    description: 'TransaccionInversionista PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() transaccionInversionista: TransaccionInversionista,
  ): Promise<void> {
    await this.transaccionInversionistaRepository.replaceById(id, transaccionInversionista);
  }

  @del('/transaccion-inversionista/{id}')
  @response(204, {
    description: 'TransaccionInversionista DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.transaccionInversionistaRepository.deleteById(id);
  }
}
