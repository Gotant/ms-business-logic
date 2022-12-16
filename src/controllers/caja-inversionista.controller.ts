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
TransaccionInversionista,
Inversionista,
} from '../models';
import {CajaRepository} from '../repositories';

export class CajaInversionistaController {
  constructor(
    @repository(CajaRepository) protected cajaRepository: CajaRepository,
  ) { }

  @get('/cajas/{id}/inversionistas', {
    responses: {
      '200': {
        description: 'Array of Caja has many Inversionista through TransaccionInversionista',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Inversionista)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Inversionista>,
  ): Promise<Inversionista[]> {
    return this.cajaRepository.inversionista(id).find(filter);
  }

  @post('/cajas/{id}/inversionistas', {
    responses: {
      '200': {
        description: 'create a Inversionista model instance',
        content: {'application/json': {schema: getModelSchemaRef(Inversionista)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Caja.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inversionista, {
            title: 'NewInversionistaInCaja',
            exclude: ['cedula'],
          }),
        },
      },
    }) inversionista: Omit<Inversionista, 'cedula'>,
  ): Promise<Inversionista> {
    return this.cajaRepository.inversionista(id).create(inversionista);
  }

  @patch('/cajas/{id}/inversionistas', {
    responses: {
      '200': {
        description: 'Caja.Inversionista PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inversionista, {partial: true}),
        },
      },
    })
    inversionista: Partial<Inversionista>,
    @param.query.object('where', getWhereSchemaFor(Inversionista)) where?: Where<Inversionista>,
  ): Promise<Count> {
    return this.cajaRepository.inversionista(id).patch(inversionista, where);
  }

  @del('/cajas/{id}/inversionistas', {
    responses: {
      '200': {
        description: 'Caja.Inversionista DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Inversionista)) where?: Where<Inversionista>,
  ): Promise<Count> {
    return this.cajaRepository.inversionista(id).delete(where);
  }
}
