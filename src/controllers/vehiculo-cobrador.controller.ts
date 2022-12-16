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
  Vehiculo,
  Cobrador,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoCobradorController {
  constructor(
    @repository(VehiculoRepository) protected vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/cobrador', {
    responses: {
      '200': {
        description: 'Vehiculo has one Cobrador',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cobrador),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Cobrador>,
  ): Promise<Cobrador> {
    return this.vehiculoRepository.cobrador(id).get(filter);
  }

  @post('/vehiculos/{id}/cobrador', {
    responses: {
      '200': {
        description: 'Vehiculo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cobrador)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Vehiculo.prototype.placa,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cobrador, {
            title: 'NewCobradorInVehiculo',
            exclude: ['cedula'],
            optional: ['vehiculoPlaca']
          }),
        },
      },
    }) cobrador: Omit<Cobrador, 'cedula'>,
  ): Promise<Cobrador> {
    return this.vehiculoRepository.cobrador(id).create(cobrador);
  }

  @patch('/vehiculos/{id}/cobrador', {
    responses: {
      '200': {
        description: 'Vehiculo.Cobrador PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
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
    return this.vehiculoRepository.cobrador(id).patch(cobrador, where);
  }

  @del('/vehiculos/{id}/cobrador', {
    responses: {
      '200': {
        description: 'Vehiculo.Cobrador DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Cobrador)) where?: Where<Cobrador>,
  ): Promise<Count> {
    return this.vehiculoRepository.cobrador(id).delete(where);
  }
}
