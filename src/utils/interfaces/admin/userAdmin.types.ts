export interface ICreateUserAdminPayload {
  name: string;
  avatar?: string;
  email: string;
  phone: string;
  role: number;
  password: string;
}

export interface IUpdateAdminPayload {
  name?: string;
  avatar?: string;
  email?: string;
  phone?: string;
  role?: number;
  password?: string;
}
