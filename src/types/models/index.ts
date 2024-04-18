import { IAddress, IInvitee, IMember, IUser, IWallet } from "./member";

interface IArtist
{
  firstName: string;
  lastName: string;
  email: string;
  _id?: string;
}

export type { IMember, IUser, IAddress, IInvitee, IWallet, IArtist };
