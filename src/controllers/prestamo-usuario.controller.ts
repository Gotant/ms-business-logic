import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Prestamo,
  Usuario,
} from '../models';
import {PrestamoRepository} from '../repositories';

export class PrestamoUsuarioController {
  constructor(
    @repository(PrestamoRepository)
    public prestamoRepository: PrestamoRepository,
  ) { }

  @get('/prestamos/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to Prestamo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.number('id') id: typeof Prestamo.prototype.id,
  ): Promise<Usuario> {
    return this.prestamoRepository.cedulaUsuarios(id);
  }
}
