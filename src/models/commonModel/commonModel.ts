/*
DB Query for common OTP
@Author Shidul Islam <shidul.m360ict@gmail.com>
*/
import { TDB } from '../../common/types/commonTypes';
import { IcommonCustomerInsert } from '../../utils/interfaces/common/commonInterface';
import Schema from '../../utils/miscellaneous/schema';

class CommonModel extends Schema {
  private db: TDB;

  constructor(db: TDB) {
    super();
    this.db = db;
  }

  // insert OTP
  public async insertCustomer(payload: IcommonCustomerInsert) {
    return await this.db('customers')
      .withSchema(this.PUBLIC_SCHEMA)
      .insert(payload);
  }
}
export default CommonModel;

/*
DB Query for common OTP Last update
@Author Mahmudul islam Moon <moon.m360ict@gmail.com>
*/
