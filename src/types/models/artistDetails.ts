export default interface IArtistDetails {
  bio?: string;
  socialLinks: SocialLinks;
  _id: string;
  firstName: string;
  lastName: string;
  password: string;
  backgroundImage?: string;
  onboarded: boolean;
  email: string;
  username: string;
  website: string;
  avatar?: string; // Optional field as it might not always be present
  isFollowing?: boolean;
  follower?: number;
  following?: number;
}

interface SocialLinks {
  instagram?: string;
  facebook?: string;
  twitter?: string;
  linkedIn?: string;
}
