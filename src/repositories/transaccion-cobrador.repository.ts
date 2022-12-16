import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {TransaccionCobrador, TransaccionCobradorRelations} from '../models';

export class TransaccionCobradorRepository extends DefaultCrudRepository<
  TransaccionCobrador,
  typeof TransaccionCobrador.prototype.id,
  TransaccionCobradorRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(TransaccionCobrador, dataSource);
  }
}
