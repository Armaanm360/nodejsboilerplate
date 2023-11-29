export interface ICreateDivisionPayload {
  name: string;
}
export interface ICreateDistrictPayload {
  divisionId: number;
  name: string;
}
export interface ICreateThanaPayload {
  districtId: number;
  name: string;
}
export interface ICreateAreaPayload {
  thanaId: number;
  name: string;
}

export interface IGetDistrictParams {
  divisionId?: number;
}
export interface IGetThanaParams extends IGetDistrictParams {
  districtId?: number;
}
export interface IGetAreaParams extends IGetThanaParams {
  thanaId?: number;
}
