import ArtPieceCardTransparent from "@/components/ArtPieceCardTransparent";
import React, { Dispatch, SetStateAction } from "react";
import ArtworkLoadingCard from "../loadingComponents/artworkLoadingCard";
import NoData from "../NoData";
import { Pagination } from "@mui/material";
interface Props {
  artworks: any[];
  baseUrl: string;
  isFetching: boolean;
  isError: boolean;
  meta?: {
    currentPage: number;
    limit: number;
    totalDoc: number;
    totalPages: number;
  };
  setCurrentPage?: Dispatch<SetStateAction<number>>;
  setLimit?: Dispatch<SetStateAction<number>>;
  refetch?: () => void;
  currentPage?: number;
  limit?: number;
}

const GridView: React.FC<Props> = ({
  artworks,
  baseUrl,
  isFetching,
  isError,
  meta,
  setCurrentPage,
  setLimit,
  refetch,
  currentPage,
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

  if (artworks?.length === 0) {
    return <NoData text="We have nothing in your artworks" />;
  }

  return (
    <>
      <div className="grid grid-cols-auto-fit gap-4">
        {artworks?.map((artpiece) => (
          <ArtPieceCardTransparent
            containerClassName={`${artworks.length < 3 ? "max-w-[350px]" : ""}`}
            url={`${baseUrl}/${artpiece?._id}`}
            image={artpiece?.assets[0]?.url || "/placeholder.png"}
            title={artpiece?.title}
            key={artpiece?._id}
            creator={{ name: artpiece?.custodian?.profile?.firstName }}
            medium={artpiece?.medium}
            createdAt={artpiece?.createdAt}
          />
        ))}
      </div>
      <div className="flex justify-center mt-6">
        {meta && (
          <Pagination
            count={meta?.totalPages}
            page={currentPage}
            onChange={(e, value) => {
              setCurrentPage(value);
              // refetch();
              window.scrollTo(0, 0);
            }}
          />
        )}
      </div>
    </>
  );
};

export default GridView;
