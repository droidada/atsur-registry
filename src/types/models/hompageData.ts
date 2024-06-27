export interface IPageArtist {
  _id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}

export interface IRating {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}

export interface IArtAsset {
  url: string;
  dateTaken: string;
  _id: string;
}

export interface IArtPiece {
  _id: string;
  id: string;
  title: string;
  medium: string;
  artType: string;
  rating: IRating;
  assets: IArtAsset;
}

export interface ICategory {
  _id: string;
  id: string;
  artPieces: IArtPiece[];
}

export interface IArtType {
  _id: string;
  artPieces: IArtPiece[];
}

export interface IArtCollection {
  categories: ICategory[];
  type: IArtType[];
}

interface IHomepageData {
  artists: IPageArtist[];
  galleries: any[];
  curations: any[];
  featured_artworks: any[];
  allPieces: IArtCollection[];
  artPieces: IArtPiece[];
}

export default IHomepageData;
