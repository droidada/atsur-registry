import ArtPieceCardTransparent from "@/components/ArtPieceCardTransparent";
import React from "react";
import ArtworkLoadingCard from "../loadingComponents/artworkLoadingCard";
import NoData from "../NoData";
import OrganizationCard from "@/components/OrganizationCard";

interface Props {
  organizations: any[];
  baseUrl: string;
  isFetching: boolean;
  isError: boolean;
}

const OrganizationGridView: React.FC<Props> = ({
  organizations,
  baseUrl,
  isFetching,
  isError,
}) => {
  if (isFetching) {
    return (
      <div className="grid grid-cols-auto-fit gap-4">
        {[...Array(6)].map((_, index) => (
          <ArtworkLoadingCard key={index} />
        ))}
      </div>
    );
  }

  if (organizations.length === 0) {
    return <NoData text="We have nothing in your organizations" />;
  }

  return (
    <div className="grid grid-cols-auto-fit gap-4">
      {organizations?.map((organization) => (
        <OrganizationCard
          organization={organization}
          key={organization._id}
          url={`${baseUrl}/${organization._id}`}
        />
      ))}
    </div>
  );
};

export default OrganizationGridView;
