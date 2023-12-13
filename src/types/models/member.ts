// import { User as FirebaseUser } from "firebase/auth";

export interface IAddress {
  walletAddress: string;
  chainId: number;
}

export interface IInvitee {
  org_id: string;
  name: string;
  email: string;
  createdAt?: number;
  updatedAt?: number;
}

export interface IMember {
  id?: string;
  user_id?: string;
  org_id?: string;
  name?: string;
  email?: string;
  companyEmail?: string;
  wallets?: [IAddress];
  type?: string;
  joined?: number;
  createdAt?: number;
  updatedAt?: number;
}

export interface IUser {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  description?: string;
  role: string;
  token: string;
  status?: string;
  isProfileSetup: boolean;
  wallets: IWallet[];
}

export interface IWallet {
  first_name?: string;
  last_name?: string;
  description?: string;
  isProfileSetup: boolean;
}
