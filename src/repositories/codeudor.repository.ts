import { inject, Getter} from '@loopback/core';
import { DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import { MysqlDataSource } from '../datasources';
import { Codeudor, CodeudorRelations, Prestamo} from '../models';
import {PrestamoRepository} from './prestamo.repository';

export class CodeudorRepository extends DefaultCrudRepository<
  Codeudor,
  typeof Codeudor.prototype.cedula,
  CodeudorRelations
> {

  public readonly prestamo: HasOneRepositoryFactory<Prestamo, typeof Codeudor.prototype.cedula>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('PrestamoRepository') protected prestamoRepositoryGetter: Getter<PrestamoRepository>,
  ) {
    super(Codeudor, dataSource);
    this.prestamo = this.createHasOneRepositoryFactoryFor('prestamo', prestamoRepositoryGetter);
    this.registerInclusionResolver('prestamo', this.prestamo.inclusionResolver);
  }
}
