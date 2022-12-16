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
import {Inversionista} from '../models';
import {InversionistaRepository} from '../repositories';

export class InversionistaController {
  constructor(
    @repository(InversionistaRepository)
    public inversionistaRepository : InversionistaRepository,
  ) {}

  @post('/inversionista')
  @response(200, {
    description: 'Inversionista model instance',
    content: {'application/json': {schema: getModelSchemaRef(Inversionista)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inversionista, {
            title: 'NewInversionista',
            
          }),
        },
      },
    })
    inversionista: Inversionista,
  ): Promise<Inversionista> {
    return this.inversionistaRepository.create(inversionista);
  }

  @get('/inversionista/count')
  @response(200, {
    description: 'Inversionista model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Inversionista) where?: Where<Inversionista>,
  ): Promise<Count> {
    return this.inversionistaRepository.count(where);
  }

  @get('/inversionista')
  @response(200, {
    description: 'Array of Inversionista model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Inversionista, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Inversionista) filter?: Filter<Inversionista>,
  ): Promise<Inversionista[]> {
    return this.inversionistaRepository.find(filter);
  }

  @patch('/inversionista')
  @response(200, {
    description: 'Inversionista PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inversionista, {partial: true}),
        },
      },
    })
    inversionista: Inversionista,
    @param.where(Inversionista) where?: Where<Inversionista>,
  ): Promise<Count> {
    return this.inversionistaRepository.updateAll(inversionista, where);
  }

  @get('/inversionista/{id}')
  @response(200, {
    description: 'Inversionista model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Inversionista, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Inversionista, {exclude: 'where'}) filter?: FilterExcludingWhere<Inversionista>
  ): Promise<Inversionista> {
    return this.inversionistaRepository.findById(id, filter);
  }

  @patch('/inversionista/{id}')
  @response(204, {
    description: 'Inversionista PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inversionista, {partial: true}),
        },
      },
    })
    inversionista: Inversionista,
  ): Promise<void> {
    await this.inversionistaRepository.updateById(id, inversionista);
  }

  @put('/inversionista/{id}')
  @response(204, {
    description: 'Inversionista PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() inversionista: Inversionista,
  ): Promise<void> {
    await this.inversionistaRepository.replaceById(id, inversionista);
  }

  @del('/inversionista/{id}')
  @response(204, {
    description: 'Inversionista DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.inversionistaRepository.deleteById(id);
  }
}
