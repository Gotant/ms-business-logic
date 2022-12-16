import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {PrestamoCaja, PrestamoCajaRelations} from '../models';

export class PrestamoCajaRepository extends DefaultCrudRepository<
  PrestamoCaja,
  typeof PrestamoCaja.prototype.id,
  PrestamoCajaRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(PrestamoCaja, dataSource);
  }
}
