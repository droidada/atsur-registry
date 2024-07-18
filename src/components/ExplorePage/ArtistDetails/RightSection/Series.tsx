import LoadingArtpieceCard from "@/components/LoadingArtpieceCard";
import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

interface Props {
  artistId: string;
}
const Series: React.FC<Props> = ({ artistId }) => {
  const { data, isLoading } = useQuery({
    queryFn: () => axios.get(`/public/series/${artistId}`),
  });

  console.log(data);

  if (isLoading) {
    return (
      <div className="grid grid-cols-auto-fit gap-4">
        {[...Array(6)].map((_, index) => (
          <LoadingArtpieceCard key={`loading-artpiece-card-${index}`} />
        ))}
      </div>
    );
  }

  console.log(data?.data?.series.length);

  if (data?.data?.series?.length == 0) {
    return (
      <div className="flex flex-col items-center justify-center py-5">
        <Image
          src={"/images/empty-wallet.svg"}
          width={150}
          height={150}
          alt="empty"
        />
        <p className="italic font-[300] text-center">No series found</p>
      </div>
    );
  }

  return <div>Series</div>;
};

export default Series;
