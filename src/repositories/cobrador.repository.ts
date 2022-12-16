import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Cobrador, CobradorRelations, Pago} from '../models';
import {PagoRepository} from './pago.repository';

export class CobradorRepository extends DefaultCrudRepository<
  Cobrador,
  typeof Cobrador.prototype.cedula,
  CobradorRelations
> {

  public readonly pago: HasManyRepositoryFactory<Pago, typeof Cobrador.prototype.cedula>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('PagoRepository') protected pagoRepositoryGetter: Getter<PagoRepository>,
  ) {
    super(Cobrador, dataSource);
    this.pago = this.createHasManyRepositoryFactoryFor('pago', pagoRepositoryGetter,);
    this.registerInclusionResolver('pago', this.pago.inclusionResolver);
  }
}
