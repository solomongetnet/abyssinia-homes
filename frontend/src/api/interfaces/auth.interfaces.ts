export interface ILoginReq {
  email: string;
  password: string;
}
export interface ISignupReq {
  fullName: string;
  email: string;
  password: string;
  role?: string;
  phoneNumber?: number;
}
