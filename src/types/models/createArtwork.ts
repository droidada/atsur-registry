export interface ICreateArtworkIllustration
{
    title: string,
    description: string,
    medium: string,
    subjectMatter: string,
    height: number,
    width: number,
    depth: number,
    rarity: string,
    type: string;
}

export interface ICreateArtworkAssets
{
    primaryView: any,
    secondaryView: {
        leftAngleView: any,
        rightAngleView: any,
        mountedView: any,
    },

}

export default interface ICreateArtworkFormData
{
    illustration: ICreateArtworkIllustration,
    assets: ICreateArtworkAssets;
}
