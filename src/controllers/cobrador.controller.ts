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
import {Cobrador} from '../models';
import {CobradorRepository} from '../repositories';

export class CobradorController {
  constructor(
    @repository(CobradorRepository)
    public cobradorRepository : CobradorRepository,
  ) {}

  @post('/cobrador')
  @response(200, {
    description: 'Cobrador model instance',
    content: {'application/json': {schema: getModelSchemaRef(Cobrador)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cobrador, {
            title: 'NewCobrador',
            
          }),
        },
      },
    })
    cobrador: Cobrador,
  ): Promise<Cobrador> {
    return this.cobradorRepository.create(cobrador);
  }

  @get('/cobrador/count')
  @response(200, {
    description: 'Cobrador model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Cobrador) where?: Where<Cobrador>,
  ): Promise<Count> {
    return this.cobradorRepository.count(where);
  }

  @get('/cobrador')
  @response(200, {
    description: 'Array of Cobrador model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Cobrador, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Cobrador) filter?: Filter<Cobrador>,
  ): Promise<Cobrador[]> {
    return this.cobradorRepository.find(filter);
  }

  @patch('/cobrador')
  @response(200, {
    description: 'Cobrador PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cobrador, {partial: true}),
        },
      },
    })
    cobrador: Cobrador,
    @param.where(Cobrador) where?: Where<Cobrador>,
  ): Promise<Count> {
    return this.cobradorRepository.updateAll(cobrador, where);
  }

  @get('/cobrador/{id}')
  @response(200, {
    description: 'Cobrador model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cobrador, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Cobrador, {exclude: 'where'}) filter?: FilterExcludingWhere<Cobrador>
  ): Promise<Cobrador> {
    return this.cobradorRepository.findById(id, filter);
  }

  @patch('/cobrador/{id}')
  @response(204, {
    description: 'Cobrador PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cobrador, {partial: true}),
        },
      },
    })
    cobrador: Cobrador,
  ): Promise<void> {
    await this.cobradorRepository.updateById(id, cobrador);
  }

  @put('/cobrador/{id}')
  @response(204, {
    description: 'Cobrador PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() cobrador: Cobrador,
  ): Promise<void> {
    await this.cobradorRepository.replaceById(id, cobrador);
  }

  @del('/cobrador/{id}')
  @response(204, {
    description: 'Cobrador DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.cobradorRepository.deleteById(id);
  }
}
