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
  Prestamo,
} from '../models';
import {PagoRepository} from '../repositories';

export class PagoPrestamoController {
  constructor(
    @repository(PagoRepository)
    public pagoRepository: PagoRepository,
  ) { }

  @get('/pagos/{id}/prestamo', {
    responses: {
      '200': {
        description: 'Prestamo belonging to Pago',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Prestamo)},
          },
        },
      },
    },
  })
  async getPrestamo(
    @param.path.number('id') id: typeof Pago.prototype.id,
  ): Promise<Prestamo> {
    return this.pagoRepository.prestamo(id);
  }
}
