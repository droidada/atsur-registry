export interface InviteTypeProps {
  userIsRegistered?: boolean;
  token: string;
  invitationData: any;
  isAuthenticated: boolean;
  handleAccept?: () => void;
  handleReject?: () => void;
  acceptLoading?: boolean;
  rejectLoading?: boolean;
  kycVerificationStatus?: "verified" | "rejected" | "not-verified" | "pending";
  verificationData?: any;

}
