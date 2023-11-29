export interface ILoginRes {
  success: boolean;
  message: string;
  code: number;
  data?: { id: number; name: string };
  token?: string;
}
