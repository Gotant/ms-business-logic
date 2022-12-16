import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Garantia, GarantiaRelations, Prestamo} from '../models';
import {PrestamoRepository} from './prestamo.repository';

export class GarantiaRepository extends DefaultCrudRepository<
  Garantia,
  typeof Garantia.prototype.id,
  GarantiaRelations
> {

  public readonly prestamo: HasOneRepositoryFactory<Prestamo, typeof Garantia.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('PrestamoRepository') protected prestamoRepositoryGetter: Getter<PrestamoRepository>,
  ) {
    super(Garantia, dataSource);
    this.prestamo = this.createHasOneRepositoryFactoryFor('prestamo', prestamoRepositoryGetter);
    this.registerInclusionResolver('prestamo', this.prestamo.inclusionResolver);
  }
}
