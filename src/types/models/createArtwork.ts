export interface ICreateArtworkIllustration
{
  title: string;
  description: string;
  medium: string;
  subjectMatter: string;
  height: number;
  width: number;
  depth: number;
  rarity: string;
  type: string;
  withFrame: boolean;

}

export interface ICreateArtworkAssets
{
  primaryViewLandscape: any;
  secondaryView: {
    primaryViewPortrait: any;
    framedView: any;
    mountedView: any;
  };
}

export default interface ICreateArtworkFormData
{
  illustration: ICreateArtworkIllustration;
  assets: ICreateArtworkAssets;
}
