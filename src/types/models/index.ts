import { IAddress, IMember, IUser, IWallet } from "./member";

interface IArtist {
  firstName: string;
  lastName: string;
  email: string;
  _id?: string;
}

export type { IMember, IUser, IAddress, IWallet, IArtist };
