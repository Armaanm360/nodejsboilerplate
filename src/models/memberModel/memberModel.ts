import e, { Request } from 'express';
import { TDB } from '../../common/types/commonTypes';
import { IRegistration } from '../../common/types/commonTypes';
import {
  ICreateUserMemberPayload,
  IGetUserMember,
  IUpdateUserMemberPayload,
} from '../../utils/interfaces/member/userModelInterfaces';
import Schema from '../../utils/miscellaneous/schema';
class MemberModel extends Schema {
  private db: TDB;

  constructor(db: TDB) {
    super();
    this.db = db;
  }

  // insert user member
  public async insertUserMember(payload: IRegistration) {
    const member = await this.db('userMember')
      .withSchema(this.MEMBER_SCHEMA)
      .insert(payload, 'id');

    return member;
  }

  // check user
  public async checkUser({
    email,
    mobileNumber,
  }: {
    email?: string;
    mobileNumber?: string;
  }): Promise<ICreateUserMemberPayload[]> {
    const userMember = await this.db('userMember')
      .withSchema(this.MEMBER_SCHEMA)
      .where((qb) => {
        if (email) {
          qb.orWhere('email', email);
        }
        if (mobileNumber) {
          qb.orWhere('mobileNumber', mobileNumber);
        }
      });

    return userMember;
  }

  // get single user
  public async getSingleUser(email: string): Promise<IGetUserMember[]> {
    const userMember = await this.db('userMember')
      .withSchema(this.MEMBER_SCHEMA)
      .where({ email: email })
      .select('*');

    return userMember;
  }

  // update user member
  public async updateUserMember(
    payload: IUpdateUserMemberPayload,
    where: { email?: string; id?: number }
  ) {
    return await this.db('userMember')
      .withSchema(this.MEMBER_SCHEMA)
      .update(payload)
      .where((qb) => {
        if (where.email) {
          qb.where({ email: where.email });
        }
        if (where.id) {
          qb.where({ id: where.id });
        }
      });
  }
}
export default MemberModel;
