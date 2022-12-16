import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Prestamo} from '../models';
import {PrestamoRepository} from './prestamo.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.cedula,
  UsuarioRelations
> {

  public readonly prestamos: HasManyRepositoryFactory<Prestamo, typeof Usuario.prototype.cedula>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('PrestamoRepository') protected prestamoRepositoryGetter: Getter<PrestamoRepository>,
  ) {
    super(Usuario, dataSource);
    this.prestamos = this.createHasManyRepositoryFactoryFor('prestamos', prestamoRepositoryGetter,);
    this.registerInclusionResolver('prestamos', this.prestamos.inclusionResolver);
  }
}
