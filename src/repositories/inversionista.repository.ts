import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Inversionista, InversionistaRelations} from '../models';

export class InversionistaRepository extends DefaultCrudRepository<
  Inversionista,
  typeof Inversionista.prototype.cedula,
  InversionistaRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Inversionista, dataSource);
  }
}
