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
import {PrestamoCaja} from '../models';
import {PrestamoCajaRepository} from '../repositories';

export class PrestamoCajaController {
  constructor(
    @repository(PrestamoCajaRepository)
    public prestamoCajaRepository : PrestamoCajaRepository,
  ) {}

  @post('/prestamo-caja')
  @response(200, {
    description: 'PrestamoCaja model instance',
    content: {'application/json': {schema: getModelSchemaRef(PrestamoCaja)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PrestamoCaja, {
            title: 'NewPrestamoCaja',
            exclude: ['id'],
          }),
        },
      },
    })
    prestamoCaja: Omit<PrestamoCaja, 'id'>,
  ): Promise<PrestamoCaja> {
    return this.prestamoCajaRepository.create(prestamoCaja);
  }

  @get('/prestamo-caja/count')
  @response(200, {
    description: 'PrestamoCaja model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PrestamoCaja) where?: Where<PrestamoCaja>,
  ): Promise<Count> {
    return this.prestamoCajaRepository.count(where);
  }

  @get('/prestamo-caja')
  @response(200, {
    description: 'Array of PrestamoCaja model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PrestamoCaja, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PrestamoCaja) filter?: Filter<PrestamoCaja>,
  ): Promise<PrestamoCaja[]> {
    return this.prestamoCajaRepository.find(filter);
  }

  @patch('/prestamo-caja')
  @response(200, {
    description: 'PrestamoCaja PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PrestamoCaja, {partial: true}),
        },
      },
    })
    prestamoCaja: PrestamoCaja,
    @param.where(PrestamoCaja) where?: Where<PrestamoCaja>,
  ): Promise<Count> {
    return this.prestamoCajaRepository.updateAll(prestamoCaja, where);
  }

  @get('/prestamo-caja/{id}')
  @response(200, {
    description: 'PrestamoCaja model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PrestamoCaja, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PrestamoCaja, {exclude: 'where'}) filter?: FilterExcludingWhere<PrestamoCaja>
  ): Promise<PrestamoCaja> {
    return this.prestamoCajaRepository.findById(id, filter);
  }

  @patch('/prestamo-caja/{id}')
  @response(204, {
    description: 'PrestamoCaja PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PrestamoCaja, {partial: true}),
        },
      },
    })
    prestamoCaja: PrestamoCaja,
  ): Promise<void> {
    await this.prestamoCajaRepository.updateById(id, prestamoCaja);
  }

  @put('/prestamo-caja/{id}')
  @response(204, {
    description: 'PrestamoCaja PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() prestamoCaja: PrestamoCaja,
  ): Promise<void> {
    await this.prestamoCajaRepository.replaceById(id, prestamoCaja);
  }

  @del('/prestamo-caja/{id}')
  @response(204, {
    description: 'PrestamoCaja DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.prestamoCajaRepository.deleteById(id);
  }
}
