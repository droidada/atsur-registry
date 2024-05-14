import Image from "next/image";
import React from "react";

interface Props {
  text: string;
}
const NoData: React.FC<Props> = ({ text }) => {
  return (
    <div className="h-[250px] grid place-items-center">
      <div className="flex gap-2">
        <Image
          src="/images/no-data.png"
          width={119}
          height={130}
          className="object-contain"
          alt=""
        />
        <div className="flex flex-col gap-2">
          <h3 className="lg:leading-[66px] font-[700] text-2xl lg:text-[66px]">
            OOPS!!!
          </h3>
          <p className="font-[500] text-lg lg:text-[22px] leading-[16px]">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoData;
