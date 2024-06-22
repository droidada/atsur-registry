interface INotification
{

    createdAt: string;
    invitation?: {
        invitee: {
            firstName: string;
            lastName: string;
            email: string;
        };
        token: string;
        _id: string;
    };
    read: boolean;
    message?: string;
    sender?: {
        firstName: string;
        lastName: string;
        email: string;
        avatar: string;
        id: string;
    };
    type:
    | "user-invite"
    | "sign-up"
    | "org-created"
    | "org-invite"
    | "art-piece-created"
    | "art-piece-artist-invite"
    | "art-piece-org-invite"
    | "art-piece-collaborator-invite"
    | "collection-created";
    _id: string;

}
