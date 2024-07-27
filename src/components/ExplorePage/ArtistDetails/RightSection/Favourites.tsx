import Image from "next/image";
import React from "react";

interface Props {
  artistId: string;
}
const Favourites: React.FC<Props> = ({ artistId }) => {
  return (
    <div className="flex flex-col items-center justify-center py-5">
      <Image
        src={"/images/empty-wallet.svg"}
        width={150}
        height={150}
        alt="empty"
      />
      <p className="italic font-[300] text-center">No data found</p>
    </div>
  );
};

export default Favourites;
