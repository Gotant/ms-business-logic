import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Pago, PagoRelations, Sucursal, Cobrador, Prestamo} from '../models';
import {SucursalRepository} from './sucursal.repository';
import {CobradorRepository} from './cobrador.repository';
import {PrestamoRepository} from './prestamo.repository';

export class PagoRepository extends DefaultCrudRepository<
  Pago,
  typeof Pago.prototype.id,
  PagoRelations
> {

  public readonly sucursal: BelongsToAccessor<Sucursal, typeof Pago.prototype.id>;

  public readonly cobradorCedulas: BelongsToAccessor<Cobrador, typeof Pago.prototype.id>;

  public readonly prestamo: BelongsToAccessor<Prestamo, typeof Pago.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('SucursalRepository') protected sucursalRepositoryGetter: Getter<SucursalRepository>, @repository.getter('CobradorRepository') protected cobradorRepositoryGetter: Getter<CobradorRepository>, @repository.getter('PrestamoRepository') protected prestamoRepositoryGetter: Getter<PrestamoRepository>,
  ) {
    super(Pago, dataSource);
    this.prestamo = this.createBelongsToAccessorFor('prestamo', prestamoRepositoryGetter,);
    this.registerInclusionResolver('prestamo', this.prestamo.inclusionResolver);
    this.cobradorCedulas = this.createBelongsToAccessorFor('cobradorCedulas', cobradorRepositoryGetter,);
    this.registerInclusionResolver('cobradorCedulas', this.cobradorCedulas.inclusionResolver);
    this.sucursal = this.createBelongsToAccessorFor('sucursal', sucursalRepositoryGetter,);
    this.registerInclusionResolver('sucursal', this.sucursal.inclusionResolver);
  }
}
