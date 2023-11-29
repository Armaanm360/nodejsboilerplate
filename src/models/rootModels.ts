import { Knex } from 'knex';
import CommonModel from './commonModel/commonModel';
import MemberModel from './memberModel/memberModel';
class Models {
  private db: Knex;

  constructor(db: Knex) {
    this.db = db;
  }
  // common models
  public commonModel(trx?: Knex.Transaction) {
    return new CommonModel(trx || this.db);
  }

  // member registration models
  public memberModel(trx?: Knex.Transaction) {
    return new MemberModel(trx || this.db);
  }
}
export default Models;
