import Image from "next/image";
import React from "react";

interface Props {
  text: string;
}
const NoData: React.FC<Props> = ({ text }) => {
  return (
    <div className="h-[250px] grid place-items-center">
      <div className="flex flex-col items-center gap-2">
        <Image
          src={"/images/empty-wallet.svg"}
          width={150}
          height={150}
          alt="empty"
        />

        <p className="font-[500] text-lg lg:text-[22px] leading-[16px]">
          {text}
        </p>
      </div>
    </div>
  );
};

export default NoData;
