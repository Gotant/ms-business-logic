import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Prestamo, Pago} from '../models';
import {PrestamoRepository} from './prestamo.repository';
import {PagoRepository} from './pago.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.cedula,
  UsuarioRelations
> {

  public readonly prestamos: HasManyRepositoryFactory<Prestamo, typeof Usuario.prototype.cedula>;

  public readonly pagos: HasManyRepositoryFactory<Pago, typeof Usuario.prototype.cedula>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('PrestamoRepository') protected prestamoRepositoryGetter: Getter<PrestamoRepository>, @repository.getter('PagoRepository') protected pagoRepositoryGetter: Getter<PagoRepository>,
  ) {
    super(Usuario, dataSource);
    this.pagos = this.createHasManyRepositoryFactoryFor('pagos', pagoRepositoryGetter,);
    this.registerInclusionResolver('pagos', this.pagos.inclusionResolver);
    this.prestamos = this.createHasManyRepositoryFactoryFor('prestamos', prestamoRepositoryGetter,);
    this.registerInclusionResolver('prestamos', this.prestamos.inclusionResolver);
  }
}
