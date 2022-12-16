import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Pago,
  Cobrador,
} from '../models';
import {PagoRepository} from '../repositories';

export class PagoCobradorController {
  constructor(
    @repository(PagoRepository)
    public pagoRepository: PagoRepository,
  ) { }

  @get('/pagos/{id}/cobrador', {
    responses: {
      '200': {
        description: 'Cobrador belonging to Pago',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cobrador)},
          },
        },
      },
    },
  })
  async getCobrador(
    @param.path.number('id') id: typeof Pago.prototype.id,
  ): Promise<Cobrador> {
    return this.pagoRepository.cobradorCedulas(id);
  }
}
