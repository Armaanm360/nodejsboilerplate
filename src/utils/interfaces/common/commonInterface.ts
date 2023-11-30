export interface IcommonCustomerInsert {
  first_name: string;
  last_name: string;
  email: string;
}
export interface OTPType {
  type: 'forget_member' | 'forget_admin' | 'verify_member';
}
export interface IInsertOTPPayload extends OTPType {
  hashedOtp: string;
  email: string;
}

export interface IGetOTPPayload extends OTPType {
  email: string;
}

export interface IInsertAuditTrailPayload {
  adminId: number;
  details: string;
  status: boolean;
}

export interface IcommonInsertRes {
  command: string;
  rowCount: number;
  oid: number;
  rows: any[];
}
