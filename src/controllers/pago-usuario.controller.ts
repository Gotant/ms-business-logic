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
  Usuario,
} from '../models';
import {PagoRepository} from '../repositories';

export class PagoUsuarioController {
  constructor(
    @repository(PagoRepository)
    public pagoRepository: PagoRepository,
  ) { }

  @get('/pagos/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to Pago',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.number('id') id: typeof Pago.prototype.id,
  ): Promise<Usuario> {
    return this.pagoRepository.usuario(id);
  }
}
