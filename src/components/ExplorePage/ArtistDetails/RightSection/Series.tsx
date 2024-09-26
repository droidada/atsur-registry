import LoadingArtpieceCard from "@/components/LoadingArtpieceCard";
import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  artistId: string;
}
const Series: React.FC<Props> = ({ artistId }) => {
  const { data, isLoading } = useQuery({
    queryFn: () => axios.get(`/public/series/${artistId}`),
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-auto-fit gap-4">
        {[...Array(6)].map((_, index) => (
          <LoadingArtpieceCard key={`loading-artpiece-card-${index}`} />
        ))}
      </div>
    );
  }

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

  return (
    <div className="flex flex-wrap  gap-4">
      {data?.data?.series?.map((serie) => (
        <div
          key={serie?._id}
          className="flex max-w-[250px] items-center gap-2 flex-col"
        >
          <div className="w-full p-2 border-[1px] h-[279px]">
            <Image
              width={224.66}
              height={279}
              className="w-full h-full object-cover"
              src={serie?.image}
              alt={serie?.title}
            />
          </div>
          <Link href={`/explore/series/${serie?._id}`}>{serie?.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default Series;
