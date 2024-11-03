export interface ICreateArtworkIllustration {
  price: {
    amount: number;
    currency?: string;
    type: string;
  };
  salesType: string;
  creationDate: {
    date: string | number;
    isCirca: boolean;
  };
  title: string;
  description: string;
  medium: string;
  isDigital: boolean;
  subjectMatter: string;
  inviteType?: "artist" | "org";
  artistInvite?: {
    firstName: string;
    lastName: string;
    email: string;
  };
  orgInvite?: {
    name: string;
    email: string;
    _id: string;
  };
  dimensions: {
    height: number;
    width: number;
    depth: number;
  };
  rarity: string;
  type: string;
  withFrame?: boolean;
}

export interface ICreateArtworkAssets {
  primaryViewLandscape: any;
  secondaryView: {
    primaryViewPortrait: any;
    framedView: any;
    mountedView: any;
  };
}

export default interface ICreateArtworkFormData {
  illustration: ICreateArtworkIllustration;
  assets: ICreateArtworkAssets;
}
