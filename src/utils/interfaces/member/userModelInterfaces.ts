export interface ICreateUserMemberPayload {
  name: string;
  email: string;
  password: string;
  mobileNumber: string;
  country: string;
  district: string;
  facebook_link: string;
  status?: string;
}

export interface IUpdateUserMemberPayload {
  name?: string;
  email?: string;
  emailVerification?: boolean;
  password?: string;
  mobileNumber?: string;
  mobileNumberVerification?: boolean;
  status?: string;
}

export interface IGetUserMember extends ICreateUserMemberPayload {
  id: number;
  mobileNumberVerification: boolean;
  emailVerification: boolean;
}
