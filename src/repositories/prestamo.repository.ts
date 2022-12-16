import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Prestamo, PrestamoRelations, Usuario, Pago} from '../models';
import {UsuarioRepository} from './usuario.repository';
import {PagoRepository} from './pago.repository';

export class PrestamoRepository extends DefaultCrudRepository<
  Prestamo,
  typeof Prestamo.prototype.id,
  PrestamoRelations
> {

  public readonly cedulaUsuarios: BelongsToAccessor<Usuario, typeof Prestamo.prototype.id>;

  public readonly pago: HasManyRepositoryFactory<Pago, typeof Prestamo.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('PagoRepository') protected pagoRepositoryGetter: Getter<PagoRepository>,
  ) {
    super(Prestamo, dataSource);
    this.pago = this.createHasManyRepositoryFactoryFor('pago', pagoRepositoryGetter,);
    this.registerInclusionResolver('pago', this.pago.inclusionResolver);
    this.cedulaUsuarios = this.createBelongsToAccessorFor('cedulaUsuarios', usuarioRepositoryGetter,);
    this.registerInclusionResolver('cedulaUsuarios', this.cedulaUsuarios.inclusionResolver);
  }
}
