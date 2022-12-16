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
  Sucursal,
} from '../models';
import {PagoRepository} from '../repositories';

export class PagoSucursalController {
  constructor(
    @repository(PagoRepository)
    public pagoRepository: PagoRepository,
  ) { }

  @get('/pagos/{id}/sucursal', {
    responses: {
      '200': {
        description: 'Sucursal belonging to Pago',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Sucursal)},
          },
        },
      },
    },
  })
  async getSucursal(
    @param.path.number('id') id: typeof Pago.prototype.id,
  ): Promise<Sucursal> {
    return this.pagoRepository.sucursal(id);
  }
}
