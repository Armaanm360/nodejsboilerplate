/*
DB Query for common OTP
@Author Shidul Islam <shidul.m360ict@gmail.com>
*/
import { TDB } from '../../common/types/commonTypes';
import {
  IGetOTPPayload,
  IInsertOTPPayload,
  IcommonCustomerInsert,
} from '../../utils/interfaces/common/commonInterface';
import Schema from '../../utils/miscellaneous/schema';

class CommonModel extends Schema {
  private db: TDB;

  constructor(db: TDB) {
    super();
    this.db = db;
  }

  //test
  public async insertCustomer(payload: IcommonCustomerInsert) {
    return await this.db('customers')
      .withSchema(this.PUBLIC_SCHEMA)
      .insert(payload);
  }

  //set otp

  // insert OTP
  public async insertOTP(payload: IInsertOTPPayload) {
    return await this.db('emailOtp')
      .withSchema(this.DBO_SCHEMA)
      .insert(payload);
  }

  // get otp
  public async getOTP(payload: IGetOTPPayload) {
    const check = await this.db('emailOtp')
      .withSchema(this.DBO_SCHEMA)
      .select('id', 'hashedOtp', 'tried')
      .andWhere('email', payload.email)
      .andWhere('type', payload.type)
      .andWhere('matched', 0)
      .andWhere('tried', '<', 3)
      .andWhereRaw(`"createdAt" + interval '3 minutes' > NOW()`);

    return check;
  }

  //update otp
  // update otp
  public async updateOTP(
    payload: { tried: number; matched?: number },
    where: { id: number }
  ) {
    return await this.db('emailOtp')
      .withSchema(this.DBO_SCHEMA)
      .update(payload)
      .where(where);
  }
}
export default CommonModel;

/*
DB Query for common OTP Last update
@Author Mahmudul islam Moon <moon.m360ict@gmail.com>
*/
