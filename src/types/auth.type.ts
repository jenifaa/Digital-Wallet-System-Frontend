export interface ISendOtp{
  email:string
}
export interface IVerifyOtp{
  email:string,
  otp:string
}

export interface ILogin{
  email:string,
  password:string
}


export interface IAuthProvider {
  provider: "google" | "credentials";
  providerId: string;
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  phone: string;
  picture?: string;
  address?: string;
  isDeleted?: boolean;
  isActive?: boolean;
  isVerified?: boolean;
  isAgentApproved?: boolean;
  role: string;
  auths: IAuthProvider[];
  wallet?: string;
  transaction?: string[];
  agents?: string[];
  createdAt?: Date;
}