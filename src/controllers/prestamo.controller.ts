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
import {Prestamo} from '../models';
import {PrestamoRepository} from '../repositories';

export class PrestamoController {
  constructor(
    @repository(PrestamoRepository)
    public prestamoRepository : PrestamoRepository,
  ) {}

  @post('/prestamo')
  @response(200, {
    description: 'Prestamo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Prestamo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Prestamo, {
            title: 'NewPrestamo',
            exclude: ['id'],
          }),
        },
      },
    })
    prestamo: Omit<Prestamo, 'id'>,
  ): Promise<Prestamo> {
    return this.prestamoRepository.create(prestamo);
  }

  @get('/prestamo/count')
  @response(200, {
    description: 'Prestamo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Prestamo) where?: Where<Prestamo>,
  ): Promise<Count> {
    return this.prestamoRepository.count(where);
  }

  @get('/prestamo')
  @response(200, {
    description: 'Array of Prestamo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Prestamo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Prestamo) filter?: Filter<Prestamo>,
  ): Promise<Prestamo[]> {
    return this.prestamoRepository.find(filter);
  }

  @patch('/prestamo')
  @response(200, {
    description: 'Prestamo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Prestamo, {partial: true}),
        },
      },
    })
    prestamo: Prestamo,
    @param.where(Prestamo) where?: Where<Prestamo>,
  ): Promise<Count> {
    return this.prestamoRepository.updateAll(prestamo, where);
  }

  @get('/prestamo/{id}')
  @response(200, {
    description: 'Prestamo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Prestamo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Prestamo, {exclude: 'where'}) filter?: FilterExcludingWhere<Prestamo>
  ): Promise<Prestamo> {
    return this.prestamoRepository.findById(id, filter);
  }

  @patch('/prestamo/{id}')
  @response(204, {
    description: 'Prestamo PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Prestamo, {partial: true}),
        },
      },
    })
    prestamo: Prestamo,
  ): Promise<void> {
    await this.prestamoRepository.updateById(id, prestamo);
  }

  @put('/prestamo/{id}')
  @response(204, {
    description: 'Prestamo PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() prestamo: Prestamo,
  ): Promise<void> {
    await this.prestamoRepository.replaceById(id, prestamo);
  }

  @del('/prestamo/{id}')
  @response(204, {
    description: 'Prestamo DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.prestamoRepository.deleteById(id);
  }
}
