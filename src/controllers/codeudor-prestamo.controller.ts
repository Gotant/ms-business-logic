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
  Codeudor,
  Prestamo,
} from '../models';
import {CodeudorRepository} from '../repositories';

export class CodeudorPrestamoController {
  constructor(
    @repository(CodeudorRepository) protected codeudorRepository: CodeudorRepository,
  ) { }

  @get('/codeudors/{id}/prestamo', {
    responses: {
      '200': {
        description: 'Codeudor has one Prestamo',
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
    return this.codeudorRepository.prestamo(id).get(filter);
  }

  @post('/codeudors/{id}/prestamo', {
    responses: {
      '200': {
        description: 'Codeudor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Prestamo)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Codeudor.prototype.cedula,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Prestamo, {
            title: 'NewPrestamoInCodeudor',
            exclude: ['id'],
            optional: ['cedulaCodeudor']
          }),
        },
      },
    }) prestamo: Omit<Prestamo, 'id'>,
  ): Promise<Prestamo> {
    return this.codeudorRepository.prestamo(id).create(prestamo);
  }

  @patch('/codeudors/{id}/prestamo', {
    responses: {
      '200': {
        description: 'Codeudor.Prestamo PATCH success count',
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
    return this.codeudorRepository.prestamo(id).patch(prestamo, where);
  }

  @del('/codeudors/{id}/prestamo', {
    responses: {
      '200': {
        description: 'Codeudor.Prestamo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Prestamo)) where?: Where<Prestamo>,
  ): Promise<Count> {
    return this.codeudorRepository.prestamo(id).delete(where);
  }
}
