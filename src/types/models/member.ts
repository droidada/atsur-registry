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
  gender?: string;
  description?: string;
  bio?: string;
  role: string;
  token?: string;
  status?: string;
  isOnboarded: boolean;
  wallets: IWallet[];
  artworks: IWallet[];
  organizations: IOrganization[];
}

export interface IWallet {
  salt?: string;
  address: string;
  isDeployed: boolean;
  isFactoryWallet: boolean;
  signers: string[];
  hostaddress: string;
}

export interface IEntry {
  artwork_title: string;
  series_title?: string;
  record_type: string;
  description: string;
  subject_matter?: string;
  height?: number;
  width?: number;
  depth?: number;
  weight?: number;
  materials?: string[];
  mediums?: string[];
}
export interface IOrganization {
  name: string;
  type: string;
  email: string;
  description: string;
  specialties: string[];
  address: string;
  owners: IUser[];
}
