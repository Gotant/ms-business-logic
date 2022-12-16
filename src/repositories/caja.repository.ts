import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyThroughRepositoryFactory, repository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Caja, CajaRelations, Cobrador, Inversionista, Prestamo, PrestamoCaja, TransaccionCobrador, TransaccionInversionista} from '../models';
import {CobradorRepository} from './cobrador.repository';
import {InversionistaRepository} from './inversionista.repository';
import {PrestamoCajaRepository} from './prestamo-caja.repository';
import {PrestamoRepository} from './prestamo.repository';
import {TransaccionCobradorRepository} from './transaccion-cobrador.repository';
import {TransaccionInversionistaRepository} from './transaccion-inversionista.repository';

export class CajaRepository extends DefaultCrudRepository<
  Caja,
  typeof Caja.prototype.id,
  CajaRelations
> {

  public readonly inversionista: HasManyThroughRepositoryFactory<Inversionista, typeof Inversionista.prototype.cedula,
    TransaccionInversionista,
    typeof Caja.prototype.id
  >;

  public readonly prestamo: HasManyThroughRepositoryFactory<Prestamo, typeof Prestamo.prototype.id,
    PrestamoCaja,
    typeof Caja.prototype.id
  >;

  public readonly cobrador: HasManyThroughRepositoryFactory<Cobrador, typeof Cobrador.prototype.cedula,
    TransaccionCobrador,
    typeof Caja.prototype.id
  >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('TransaccionInversionistaRepository') protected transaccionInversionistaRepositoryGetter: Getter<TransaccionInversionistaRepository>, @repository.getter('InversionistaRepository') protected inversionistaRepositoryGetter: Getter<InversionistaRepository>, @repository.getter('PrestamoCajaRepository') protected prestamoCajaRepositoryGetter: Getter<PrestamoCajaRepository>, @repository.getter('PrestamoRepository') protected prestamoRepositoryGetter: Getter<PrestamoRepository>, @repository.getter('TransaccionCobradorRepository') protected transaccionCobradorRepositoryGetter: Getter<TransaccionCobradorRepository>, @repository.getter('CobradorRepository') protected cobradorRepositoryGetter: Getter<CobradorRepository>,
  ) {
    super(Caja, dataSource);
    this.cobrador = this.createHasManyThroughRepositoryFactoryFor('cobrador', cobradorRepositoryGetter, transaccionCobradorRepositoryGetter,);
    this.registerInclusionResolver('cobrador', this.cobrador.inclusionResolver);
    this.prestamo = this.createHasManyThroughRepositoryFactoryFor('prestamo', prestamoRepositoryGetter, prestamoCajaRepositoryGetter,);
    this.registerInclusionResolver('prestamo', this.prestamo.inclusionResolver);
    this.inversionista = this.createHasManyThroughRepositoryFactoryFor('inversionista', inversionistaRepositoryGetter, transaccionInversionistaRepositoryGetter,);
    this.registerInclusionResolver('inversionista', this.inversionista.inclusionResolver);
  }
}
