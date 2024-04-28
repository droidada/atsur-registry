import ArtPieceCardTransparent from "@/components/ArtPieceCardTransparent";
import React from "react";
import ArtworkLoadingCard from "../loadingComponents/artworkLoadingCard";
import NoData from "../NoData";
interface Props {
  artworks: any[];
  baseUrl: string;
  isFetching: boolean;
  isError: boolean;
}

const GridView: React.FC<Props> = ({
  artworks,
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

  if (artworks.length === 0) {
    return <NoData text="We have nothing in your artworks" />;
  }

  return (
    <div className="grid grid-cols-auto-fit gap-4">
      {artworks?.map((artpiece) => (
        <ArtPieceCardTransparent
          url={`${baseUrl}/${artpiece?._id}`}
          image={artpiece?.assets[0]?.url}
          title={artpiece?.title}
          key={artpiece?._id}
          creator={{ name: artpiece?.custodian?.profile?.firstName }}
          medium={artpiece?.medium}
          createdAt={artpiece?.createdAt}
        />
      ))}
    </div>
  );
};

export default GridView;
