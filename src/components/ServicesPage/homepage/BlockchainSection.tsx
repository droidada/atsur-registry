import Image from "next/image";
import React from "react";

const BlockchainSection = () => {
  return (
    <div
      className="bg-primary p-6 md:py-12 gap-4 flex justify-center flex-wrap items-center"
      data-aos="fade-up"
    >
      <div data-aos="fade-right" data-aos-delay="200">
        <Image
          width={148}
          height={170}
          alt="blockchain"
          src={"/assets/images/services/blockchain.svg"}
        />
      </div>
      <h2
        className="text-4xl text-white"
        data-aos="fade-left"
        data-aos-delay="300"
      >
        <span className="font-bold">BLOCKCHAIN</span>{" "}
        <span className="italic">
          TECHNOLOGY <br /> INTEGRATION
        </span>
      </h2>
    </div>
  );
};

export default BlockchainSection;
