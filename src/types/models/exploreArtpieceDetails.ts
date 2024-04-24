interface IArtPieceDetails
{
    creationDate: {
        circa: boolean;
    };
    custodian: {
        profile: {
            _id: string;
            firstName: string;
            lastName: string;
            avatar: string;
        };
        broker: {
            revenueSplit: any[];
            artist: any[];
        };
    };
    price: {
        negotiable: boolean;
    };
    _id: string;
    title: string;
    description: string;
    rarity: string;
    medium: string;
    subjectMatter: string;
    artType: string;
    height: number;
    width: number;
    depth: number;
    weight: number;
    artists: any[];
    published: boolean;
    publicViewAll: boolean;
    approvedViewers: any[];
    exhibitions: any[];
    locations: any[];
    publications: any[];
    appraisals: any[];
    auctions: any[];
    verificationStatus: string;
    rating: number;
    assets: Asset[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    acquisition: null;
    artist: {
        storyTelling: string;
        creationVideo: {
            url: string;
        };
        attachments: (Attachment | null)[];
        partOfSeries: boolean;
        series: string;
        planToSell: boolean;
        sellerType: string;
    };
    verification: {
        _id: string;
        status: string;
    };

}

export interface IRelatedArtPiece
{
    custodian: {
        profile: {
            _id: string;
            firstName: string;
            lastName: string;
            avatar: string;
        };
        broker: {
            revenueSplit: any[];
            artist: any[];
        };
    };
    rating: number;
    assets: Asset[];
    _id: string;
    title: string;
}


interface Asset
{
    url: string;
    dateTaken: string;
    _id: string;
}

interface Attachment
{
    url: string;
    _id: string;
}

export default IArtPieceDetails;
